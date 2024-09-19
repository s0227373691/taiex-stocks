import { createServerURL } from '@/config/finance'

export default {
    getStatus,
}

export async function getStatus() {
    const url = createServerURL()
    url.pathname = '/status'

    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}
