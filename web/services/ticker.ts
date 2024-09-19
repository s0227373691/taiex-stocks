import { createServerURL } from '@/config/finance'

export default {
    get,
    update,
}

export async function get() {
    const url = createServerURL()
    url.pathname = '/tickers'

    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}

export async function update() {
    const url = createServerURL()
    url.pathname = `/tickers/sync`

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
