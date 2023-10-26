const fetchTickerInfo = (symbol) =>
    fetch(`http://127.0.0.1:8555/ticker/${symbol}`)
        .then(res => res.json())

export default fetchTickerInfo