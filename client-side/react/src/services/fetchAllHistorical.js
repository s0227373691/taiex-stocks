const fetchAllHistorical = (symbol) =>
    fetch(`http://127.0.0.1:8555/historical/${symbol}/all`)
        .then(res => res.json())

export default fetchAllHistorical