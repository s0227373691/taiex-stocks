const ccxt = require("ccxt");

const createExchange = (parameter) => {
  const Exchange = ccxt[parameter.id];
  return new Exchange({
    options: { adjustForTimeDifference: true },
    timeout: 30000,
    apiKey: parameter.apiKey,
    secret: parameter.secret,
  });
};

const exchanges = {
  binance: {
    id: "binance",
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
  },
  binancecoinm: {
    id: "binancecoinm",
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
  },
  binanceusdm: {
    id: "binanceusdm",
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
  },
};

module.exports = {
  Binance: createExchange(exchanges.binance),
  BinanceCOINM: createExchange(exchanges.binancecoinm),
  BinanceUSDM: createExchange(exchanges.binanceusdm),
};
