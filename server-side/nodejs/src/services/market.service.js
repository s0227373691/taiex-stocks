const exchange = require("../config/exchange.config");

async function fetchPerp(_exchange) {
  try {
    if (_exchange === "binance")
      return await exchange.BinanceUSDM.fetchMarkets();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchPerp,
};
