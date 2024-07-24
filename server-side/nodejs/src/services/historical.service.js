const { HistoricalModel } = require("../models/historical.model");
const tickerService = require("../services/ticker.service");
const fugleService = require("../services/fugle.service");

async function query({ symbol, timeframe }) {
  try {
    if (symbol === undefined || symbol === null)
      return { stat: "failed", msg: "Required symbol parameter" };

    const data = await HistoricalSchema.find(
      { symbol, timeframe },
      { _id: false, __v: false, symbol: false, timeframe: false }
    ).sort({ date: 1 });

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function update({ symbol, timeframe }) {
  try {
    const symbolDocument = await tickerService.queryTicker(symbol)
    if (!symbolDocument) return console.log(`Not found ${symbol}`)

    const candles = await fugleService.fetchFullCandles({ symbol, timeframe })

    return HistoricalModel.findOneAndUpdate(
      { symbol: symbolDocument._id, timeframe },
      {
        symbol: symbolDocument._id,
        timeframe,
        candles
      },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function queryCount({ symbol, timeframe }) {
  try {
    const symbolDocument = await tickerService.queryTicker(symbol)
    if (!symbolDocument) return console.log(`Not found ${symbol}`)

    return await HistoricalSchema.find(
      { symbol: symbolDocument._id, timeframe },
      { _id: false, __v: false, symbol: false, timeframe: false }
    ).countDocuments();
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  query,
  update,
  queryCount,
};
