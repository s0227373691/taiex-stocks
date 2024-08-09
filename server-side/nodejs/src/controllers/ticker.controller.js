const delay = require("../utils/delay");
const tickerService = require("../services/ticker.service");

async function fetchTickers(req, res) {
  const tickers = await tickerService.queryTickers();
  res.json({ data: tickers });
}

async function syncExternalData(req, res) {
  const response = await tickerService.syncExternalData();
  res.json(response);
}

module.exports = {
  fetchTickers,
  syncExternalData,
};
