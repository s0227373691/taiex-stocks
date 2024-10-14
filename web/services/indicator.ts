import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/indicator'
export default {
    getIndicators,
    createIndicators,
}

export async function getIndicators() {
    try {
        const url = new URL(`${route}`, base)
        const response = await fetch(url, {
            cache: 'no-cache',
        })
        if (!response.ok) throw new Error('Failed to fetch indicators')
        return response.json()
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
