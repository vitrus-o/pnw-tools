import readline from "readline";
import { getAllBestSellOffer } from "./utils/api.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function parseWarLootString(espionageString){
    const loot = {};
    const cutoff = espionageString.split("The operation cost")[0];
    const moneyMatch = cutoff.match(/\$([\d,]+\.\d{2})/);
    if(moneyMatch){
        loot.money = parseFloat(moneyMatch[1].replace(/,/g,""));
        loot.money = loot.money * 0.1;
    } else
        loot.money = 0;
    const resourceRegex = /([\d,]+\.\d{2}) (\w+)/g;
    let match;
    while((match = resourceRegex.exec(cutoff)) !== null){
        const amount = parseFloat(match[1].replace(/,/g,""));
        const resource = match[2].toLowerCase();
        if(resource !== "and")
            loot[resource] = amount * 0.1;
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

rl.question("Enter the espionage string: ", async (input) => {
    const loot = parseWarLootString(input);
    const totalValue = await calculateTotalValue(loot);
    console.log(`\nTotal value of loot: ${totalValue.toLocaleString()}`);
    rl.close();
    process.exit(0);
});
