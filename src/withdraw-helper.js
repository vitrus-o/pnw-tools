import open from "open";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getResourceCount, getCities } from "./utils/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function cityCount(){
    try{
        const response = await getCities();
        if(response){
            const cities = response;
            const count = cities.length;
            return count;
        }
    }catch{
        return 0;
    }
}


const keep = {
    money: 1000000,
    food: 5000,
    coal: 0,
    oil: 0,
    uranium: 150,
    lead: 0,
    iron: 0,
    bauxite: 0,
    gasoline: 1000,
    munitions: 1250,
    steel: 750,
    aluminum: 600
};

async function openBankWithDeposit() {
    try
    {
        const resources = await getResourceCount();
        const count = await cityCount();
        if (!resources || count === 0) {
            console.error('Failed to fetch resources or cities');
            return;
        }
        process.stdout.write("/withdraw ")
        for(const [resource,amount] of Object.entries(resources)){
            const keepAmount = keep[resource] * count;
            const withdrawAmount = Math.max(keepAmount - Math.floor(amount));
            if(withdrawAmount > 0)
                process.stdout.write(`${resource}:${withdrawAmount} `);
        }

    } catch (error) {
        console.error('Error: ', error);
    }
}

openBankWithDeposit();