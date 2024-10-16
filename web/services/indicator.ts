import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/indicator'
export default {
    getIndicators,
    createIndicators,
}

interface getIndicatorsParams {
    type?: 'sma' | 'ema'
}
export async function getIndicators(params: getIndicatorsParams = {}) {
    try {
        const url = new URL(`${route}/${params.type}`, base)
        const response = await fetch(url, {
            cache: 'no-cache',
        })
        if (!response.ok) throw new Error('Failed to fetch indicators')
        const parse = await response.json()
        const sort = parse.data.sort((a: any, b: any) => a.period - b.period)
        return { data: sort }
    } catch (error) {
        console.error(error)
    }
}

interface createIndicatorsParams {
    type: 'ema' | 'sma'
    period: number
}

export async function createIndicators(params: createIndicatorsParams) {
    try {
        const url = new URL(`${route}`, base)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}
