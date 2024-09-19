const LOCAL_URL = `${process.env.NEXT_PUBLIC_API_SERVER_protocal}//${process.env.NEXT_PUBLIC_API_SERVER_HOST}:${process.env.NEXT_PUBLIC_API_SERVER_PORT}`
const SERVER_URL = `${process.env.NEXT_PUBLIC_API_SERVER_protocal}//${process.env.NEXT_PUBLIC_API_SERVER_HOST}`

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_API_SERVER_PORT
    ? LOCAL_URL
    : SERVER_URL
