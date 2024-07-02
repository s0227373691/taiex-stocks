const exchange = require("../config/exchange.config");

async function fetchPerp(exchange) {
  try {
    if (exchange === "binance")
      return await exchange.BinanceUSDM.fetchMarkets();
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}

module.exports = {
  fetchPerp,
};
