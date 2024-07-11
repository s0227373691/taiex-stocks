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

export async function syncFullHistorical(symbol: string, timeframe: string) {
    try{
        const data = {
            symbol,
            timeframe
        }
        const url = new URL(`/sync/historical`, serverURL)

        const response = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })
      console.log(response)
      if(response.ok){
        console.log("Yeai!")
      }else{
        console.log("Oops! Something is wrong.")
      }
    }catch(error){
        console.error(error)
    }
}

export async function fetchHistoricalCrypto(exchange: string, symbol: string, timeframe: string) {
  try{
      const url = new URL(`/historical/crypto/${exchange}?symbol=${symbol}&timeframe=${timeframe}`, serverURL)
      const response = await fetch(url)
      const json = await response.json()
      return json;
  }catch(error){
      console.error(error)
  }
};

export async function fetchPerp() {
  try{
    const url = new URL(`/market`, serverURL)
    const response = await fetch(url)
    const json = await response.json()
    return json;
}catch(error){
    console.error(error)
}
}

export async function fetchHistoricalCount(symbol: string) {
  const url = new URL(`/sync/historical/count?symbol=${symbol}`, serverURL)
  const response = await fetch(url)
  const json = await response.json()
  return json
}