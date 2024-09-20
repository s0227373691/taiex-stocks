import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/historical'
export default {
    getStock,
    getCrypto,
    getStockCount,
    sync,
}

export async function getStock(symbol: string, timeframe: string) {
    try {
        const url = new URL(`${route}`, base)
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
        const url = new URL(`${route}/sync`, base)
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
        const url = new URL(`${route}/crypto/${exchange}`, base)
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
    const url = new URL(`${route}/candle/count`, base)
    url.searchParams.append('symbol', symbol)

    const response = await fetch(url)
    const json = await response.json()
    return json
}
