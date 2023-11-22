import delay from '../utils/delay'

const fetchAllHistorical = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8555/historical/${symbol}/all`)
        .then(res => res.json())

    if (response.status === 500) {
        await delay(1000)
        return await fetchAllHistorical(symbol)
    }

    return response
}

export default fetchAllHistorical