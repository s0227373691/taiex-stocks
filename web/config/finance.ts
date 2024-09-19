export const createServerURL = () => {
    let urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_protocal}//${process.env.NEXT_PUBLIC_API_SERVER_HOST}`
    process.env.NEXT_PUBLIC_API_SERVER_PORT &&
        (urlStr += `:${process.env.NEXT_PUBLIC_API_SERVER_PORT}`)
    return new URL(urlStr)
}

export async function fetchPerp() {
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

export async function fetchServerStatus() {
    const url = createServerURL()
    url.pathname = '/status'

    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)

    const json = await response.json()
    return json
}
