const TickersModel = require("../models/tickers.model");
const fugleService = require("./fugle.service");

async function syncExternalData() {
  try {
    const equitys = await fugleService.fetchFullEquity();
    const equityPromises = equitys?.tikers.map((equity) =>
      updateTicker(equity)
    );
    return Promise.all(equityPromises);
  } catch (error) {
    console.error(error);
  }
}

async function updateTicker(_equity) {
  return TickersModel.findOneAndUpdate(
    { symbol: _equity.symbol, name: _equity.name },
    {
      symbol: _equity.symbol,
      name: _equity.name,
      type: _equity.type,
      updateTime: new Date(_equity.date),
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

module.exports = {
  syncExternalData,
  queryTicker,
};
