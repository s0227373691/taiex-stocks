import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/status'

export default {
    getStatus,
}

export async function getStatus() {
    const url = new URL(`${route}`, base)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}
