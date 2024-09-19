import { createServerURL } from '@/config/finance'

export default {
    getPerp,
}

export async function getPerp() {
    try {
        const url = createServerURL()
        url.pathname = `/market`

        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}
