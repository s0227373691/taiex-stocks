import {delay} from "../utils";

const serverURL = new URL('http://127.0.0.1:8555')

export async function getSnapshot(market: string) {
    const url = new URL(`/snapshot/${market}`, serverURL)
    const response = await fetch(url)
    const json = await response.json()
    return json
}


export async function getAllHistorical(symbol: string, timeframe: string) {
    try{
        const url = new URL(`/historical?symbol=${symbol}&timeframe=${timeframe}`, serverURL)
        const response = await fetch(url)
        const json = await response.json()
        return json;
    }catch(error){
        console.error(error)
    }
};