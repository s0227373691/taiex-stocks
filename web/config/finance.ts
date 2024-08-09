const createServerURL = () =>{
    let urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_protocal}//${process.env.NEXT_PUBLIC_API_SERVER_HOST}`
    process.env.NEXT_PUBLIC_API_SERVER_PORT && (urlStr+=`:${process.env.NEXT_PUBLIC_API_SERVER_PORT}`)
    return new URL(urlStr)
}

export async function getSnapshot(market: string) {
    try {
        const url = createServerURL()
        url.pathname = `/snapshot/${market}`

        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export async function getAllHistorical(symbol: string, timeframe: string) {
    try {
        const url = createServerURL()
        url.pathname = '/historical'
        url.searchParams.append('symbol', symbol)
        url.searchParams.append('timeframe', timeframe)

        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export async function syncFullHistorical(symbol: string, timeframe: string) {
    try {
        const url = createServerURL()
        url.pathname = '/historical/sync'

        const data = {
            symbol,
            timeframe,
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            },
        })
        if (response.ok) {
            console.log('Yeai!')
        } else {
            console.log('Oops! Something is wrong.')
        }
    } catch (error) {
        console.error(error)
    }
}

export async function fetchHistoricalCrypto(
    exchange: string,
    symbol: string,
    timeframe: string
) {
    try {
        const url = createServerURL()
        url.pathname = `/historical/crypto/${exchange}`
        url.searchParams.append('symbol', symbol)
        url.searchParams.append('timeframe', timeframe)

        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export async function fetchPerp() {
    try {
        const url = createServerURL()
        url.pathname = `/market`

        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export async function fetchHistoricalCount(symbol: string) {
    const url = createServerURL()
    url.pathname = `/historical/candle/count`
    url.searchParams.append('symbol', symbol)

    const response = await fetch(url)
    const json = await response.json()
    return json
}

export async function getTickers(){
    const url = createServerURL()
    url.pathname = '/tickers'

    const response = await fetch(url)
    if(!response.ok) throw new Error(`Response status: ${response.status}`);


    const json = await response.json();
    return json
}

export async function updateTickers(){
    const url = createServerURL()
    url.pathname = `/tickers/sync`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to update tickers');
    }
  
    return response.json();
  };