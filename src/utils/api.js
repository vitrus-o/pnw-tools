import dotenv from 'dotenv';
import path from 'path';
import Pusher from "pusher-js";
import open from "open";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

let API_KEY = process.env.API_KEY || '';
let NATION_ID = process.env.NATION_ID || '';

export function setConfig(apiKey, nationId) {
    API_KEY = apiKey;
    NATION_ID = nationId;
}

const GRAPHQL_ENDPOINT = `https://api.politicsandwar.com/graphql?api_key=${API_KEY}`;

export function createResourceCount() {
    return `query{
        nations(id:${NATION_ID}){
          data{
            money
            food
            coal
            oil
            uranium
            lead
            iron
            bauxite
            gasoline
            munitions
            steel
            aluminum
          }
        }
      }`;
}

export async function getResourceCount(){
    const query = createResourceCount();
    const response = await fetch(GRAPHQL_ENDPOINT,{
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({query})
    });
    const data = await response.json();
    return data.data?.nations?.data?.[0];
}

export async function getCities(){
    const query = createCities();
    const response = await fetch(GRAPHQL_ENDPOINT,{
        method:'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({query})
    });
    const data = await response.json();
    return data.data?.nations?.data?.[0]?.cities;
}


export function createCities(){
    return `query{
        nations(id:${NATION_ID}){
          data{
            cities{
              id
            }
          }
        }
      }`
}

 export function createBestBuyOfferQuery(resource) {
     return `
       query {
      top_trade_info {
        resources(resource: [${resource.toUpperCase()}]) {
          best_buy_offer {
            date
            offer_amount
            price
          }
        }
      }
    }
  `;
}
export function createBestSellOfferQuery(resource){
    return `
    query {
        top_trade_info{
            resources(resource:[${resource.toUpperCase()}]){
                best_sell_offer{
                    date
                    offer_amount
                    price
                }
            }
        }
    }`
}

export function createAllBestSellOfferQuery(){
    return `
    query {
        top_trade_info{
            resources{
                best_sell_offer{
                    offer_resource
                    price
                }
            }
        }
    }`
}

export async function getAllBestSellOffer(){
    const query = createAllBestSellOfferQuery();
    const response = await fetch(GRAPHQL_ENDPOINT,{
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({query}),
    });
    const data = await response.json();
    return data.data?.top_trade_info?.resources?.reduce((acc, resource) => {
        if(resource.best_sell_offer)
            acc[resource.best_sell_offer.offer_resource] = resource.best_sell_offer.price;
        return acc;
    },{});
}

export async function getBestBuyOffer(resource){
    const query = createBestBuyOfferQuery(resource);
    const response = await fetch(GRAPHQL_ENDPOINT,{
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({query}),
    });
    const data = await response.json();
    return data.data?.top_trade_info?.resources?.[0]?.best_buy_offer;
}

export async function getBestSellOffer(resource){
    const query = createBestSellOfferQuery(resource);
    const response = await fetch(GRAPHQL_ENDPOINT,{
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({query}),
    });
    const data = await response.json();
    return data.data?.top_trade_info?.resources?.[0]?.best_sell_offer;
}

export { API_KEY, NATION_ID };