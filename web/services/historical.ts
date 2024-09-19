import { createServerURL } from '@/config/finance'

export default {
    getStock,
    getCrypto,
    getStockCount,
    sync,
}

export async function getStock(symbol: string, timeframe: string) {
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

export async function sync(symbol: string, timeframe: string) {
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

export async function getCrypto(
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

export async function getStockCount(symbol: string) {
    const url = createServerURL()
    url.pathname = `/historical/candle/count`
    url.searchParams.append('symbol', symbol)

    const response = await fetch(url)
    const json = await response.json()
    return json
}
