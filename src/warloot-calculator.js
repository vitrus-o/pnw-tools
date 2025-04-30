import readline from "readline";
import { getAllBestSellOffer } from "./utils/api.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function parseWarLootString(warLootString){
    const loot = {};
    const moneyMatch = warLootString.match(/\$([\d,]+\.\d{2})/);
    if(moneyMatch){
        loot.money = parseFloat(moneyMatch[1].replace(/,/g,""));
    } else
        loot.money = 0;
    const resourceRegex = /([\d,]+\.\d{2}) (\w+)/g;
    let match;
    while((match = resourceRegex.exec(warLootString)) !== null){
        const amount = parseFloat(match[1].replace(/,/g,""));
        const resource = match[2].toLowerCase();
        if(resource !== "and")
            loot[resource] = amount;
    }
    return loot;
}

async function calculateTotalValue(loot){
    let totalValue = loot.money;
    const prices = await getAllBestSellOffer();
    for(const [resource,amount] of Object.entries(loot))
        if(resource !== "money")
            totalValue += amount * prices[resource];
    return totalValue;
}

rl.question("Enter the war loot string: ", async (input) => {
    const loot = parseWarLootString(input);
    const totalValue = await calculateTotalValue(loot);
    console.log(`Total value of loot: ${totalValue.toLocaleString()}`);
    rl.close();
});
