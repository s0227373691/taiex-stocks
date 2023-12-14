const { RestClient } = require("@fugle/marketdata");

const client = new RestClient({
  apiKey:
    "YzY2NDU1YWItZmU0OC00MjU3LTkxZGUtYjUyZWNiZWVjZmY2IDBjZjYxN2Y2LTA3ZjQtNGZlMC1hZWNjLTExYzVmNDgzYTA5MQ==",
});

// const main = () => {
//     client.stock.historical.candles({ symbol: '0050', timeframe: 'M', from: '2023-01-01', to: '2023-12-31', fields: 'open,high,low,close,volume,change' })
//         .then(data => console.log(data));
// }
// delay(1000, main)

// client.stock.snapshot.quotes({ market: 'TSE' })
//     .then(data => console.log(data.data.length));

// client.stock.intraday.ticker({ symbol: '2330' })
//     .then(data => console.log(data));

// client.stock.intraday
//     .tickers({ type: "INDEX", exchange: "TWSE", market: 'TSE', isNormal: true })
//     .then((data) => console.log(data));

module.exports = client;
