import { createServerURL } from '@/config/finance'
import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = new URL('/tickers', NEXT_PUBLIC_URL)
export default {
    get,
    update,
}

export async function get() {
    const url = new URL(base)

    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}

export async function update() {
    const url = new URL('/sync', base)
    // url.pathname = `/tickers/sync`

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
