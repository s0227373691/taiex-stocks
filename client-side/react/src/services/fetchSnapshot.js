const fetchSnapshot = (market) =>
    fetch(`http://127.0.0.1:8555/snapshot/${market}`)
        .then(res => res.json())

export default fetchSnapshot