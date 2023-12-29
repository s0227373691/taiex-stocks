const fetchTickers = (type) =>
  fetch(`http://127.0.0.1:8555/tickers/${type}`).then((res) => res.json());

export default fetchTickers;
