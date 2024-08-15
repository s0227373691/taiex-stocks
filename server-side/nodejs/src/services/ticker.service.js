const TickersModel = require("../models/tickers.model");
const fugleService = require("./fugle.service");

async function syncExternalData() {
  try {
    const fullTickers = await fugleService.fetchFullTickers();
    const tickerPromises = fullTickers?.tickers.map(updateTicker);
    return Promise.all(tickerPromises);
  } catch (error) {
    console.error(error);
  }
}

async function updateTicker(ticker) {
  return TickersModel.findOneAndUpdate(
    { symbol: ticker.symbol, name: ticker.name },
    {
      symbol: ticker.symbol,
      name: ticker.name,
      type: ticker.type,
      updateTime: new Date(ticker.date),
    },
    {
      new: true,
      upsert: true,
    }
  );
}

async function queryTicker(symbol) {
  try {
    return await TickersModel.findOne({ symbol });
  } catch (error) {
    console.error(error);
  }
}

async function queryTickers() {
  try {
    return TickersModel.find();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  syncExternalData,
  queryTicker,
  queryTickers,
};
