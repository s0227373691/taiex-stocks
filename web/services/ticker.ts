import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/tickers'

export type tickerType = {
    _id: string
    name: string
    symbol: string
    __v: number
    historicals: any[]
    type: string
    updateTime: string
}

export default {
    get,
    update,
}

export async function get() {
    const url = new URL(`${route}`, base)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}

export async function update() {
    const url = new URL(`${route}/sync`, base)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to update tickers')
    }

    return response.json()
}
