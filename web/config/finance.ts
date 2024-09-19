export const createServerURL = () => {
    let urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_protocal}//${process.env.NEXT_PUBLIC_API_SERVER_HOST}`
    process.env.NEXT_PUBLIC_API_SERVER_PORT &&
        (urlStr += `:${process.env.NEXT_PUBLIC_API_SERVER_PORT}`)
    return new URL(urlStr)
}
