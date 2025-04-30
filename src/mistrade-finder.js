import Pusher from "pusher-js";
import open from "open";
import {API_KEY, createBestBuyOfferQuery, createBestSellOfferQuery, getBestBuyOffer, getBestSellOffer} from "./utils/api.js";

const channelName = JSON.parse(await(await fetch(`https://api.politicsandwar.com/subscriptions/v1/subscribe/trade/create?api_key=${API_KEY}`,{
  method: 'GET',
})).text()).channel;

const pusher = new Pusher("a22734a47847a64386c8",{
  cluster: "mt1",
  wsHost: "socket.politicsandwar.com",
  disableStats: true,
  authEndpoint: "https://api.politicsandwar.com/subscriptions/v1/auth",
});

const channel = pusher.subscribe(channelName);

function calculateProfit(queryPrice, dataPrice, queryAmount, dataAmount, isBuy = false) {
  return isBuy ? (dataPrice - queryPrice) * Math.min(queryAmount, dataAmount) : (queryPrice - dataPrice) * Math.min(queryAmount, dataAmount);
}

channel.bind("BULK_TRADE_CREATE", async (trades) => {
  const trade = trades[0];
  if(trade.accepted === 0){
    const offerPromise = trade.buy_or_sell === "sell" ? getBestBuyOffer(trade.offer_resource) : getBestSellOffer(trade.offer_resource);

        offerPromise.then(async (offer) => {
          if (offer) {
              const isBuy = trade.buy_or_sell === "buy";
              const profit = calculateProfit(offer.price,trade.price,offer.offer_amount,trade.offer_amount,isBuy);
              if(profit > 0){
                console.log(`\n\n\n\nProfitS: $${profit}\n\n${trade.offer_amount} ${trade.offer_resource} ${(trade.buy_or_sell === "buy" ? "bought" : "sold")} at ${trade.price}\n${offer.offer_amount} ${trade.offer_resource} ${(trade.buy_or_sell === "buy" ? "sold" : "bought")} at ${offer.price}\n`);
                const url = 'https://politicsandwar.com/index.php?id=26&display=world&resource1=' + trade.offer_resource + '&buysell=' + trade.buy_or_sell + '&ob=price&od=DEF&maximum=10&minimum=0&search=Go';
                console.log(url);
                await open(url);
              }
          }
      }).catch(error => {
          console.error(`Error fetching best ${trade.buy_or_sell} offer:`, error);
      });
  }
});