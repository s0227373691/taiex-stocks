import {delay} from "../utils";

const serverURL = new URL('http://127.0.0.1:8555')

export async function getSnapshot(market: string) {
    const url = new URL(`/snapshot/${market}`, serverURL)
    const response = await fetch(url)
    const json = await response.json()
    return json
}


export async function getAllHistorical(symbol: string, timeframe: string) {
    const url = new URL(`/historical/${symbol}/all/${timeframe}`, serverURL)
    const response = await fetch(url)
    const json = await response.json()

    if (json.status === 500) {
        await delay(1000);
        return await getAllHistorical(symbol, timeframe);
    }

    return json;
};