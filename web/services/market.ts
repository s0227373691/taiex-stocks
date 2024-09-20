import { NEXT_PUBLIC_URL } from '@/lib/constant'

const base = NEXT_PUBLIC_URL
const route = '/market'

export default {
    getPerp,
}

export async function getPerp() {
    try {
        const url = new URL(`${route}`, base)
        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}
