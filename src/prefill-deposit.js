import open from "open";
import { getResourceCount, getCities } from "./utils/api.js";

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

async function openBankWithDeposit() {
    try
    {
        const resources = await getResourceCount();
        const count = await cityCount();
        if (!resources || count === 0) {
            console.error('Failed to fetch resources or cities');
            return;
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
        const deposit = {};
        for(const [resource,amount] of Object.entries(resources)){
            const keepAmount = keep[resource] * count;
            const depositAmount = Math.max(Math.floor(amount) - keepAmount);
            if(depositAmount > 0)
                deposit[resource] = depositAmount;
        }
        const baseUrl = 'https://politicsandwar.com/alliance/id=4124&display=bank&';
        const queryParams = new URLSearchParams();
        for(const [resource,amount] of Object.entries(deposit)){
            queryParams.append(`d_${resource}`,amount);
        }
        const url = `${baseUrl}${queryParams.toString()}`;
        await open(url);
    } catch (error) {
        console.error('Error opening bank with deposit:', error);
    }
}

openBankWithDeposit();