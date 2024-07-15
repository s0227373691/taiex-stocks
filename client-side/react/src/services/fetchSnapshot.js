const fetchSnapshot = (market) =>
    // fetch(`http://127.0.0.1:8555/snapshot/${market}`)
    fetch(`http://${process.env.NEXT_PUBLIC_API_SERVER_IP}:8555/snapshot/${market}`)
        .then(res => res.json())

export default fetchSnapshot