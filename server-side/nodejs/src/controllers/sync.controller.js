const client = require("../config/fugle.config");
const delay = require("../utils/delay");
const historicalService = require("../services/historical.service");

async function fullHistorical(req, res) {
  const body = req.body;

  //   Check parameters
  if (body.symbol === null || body.symbol === undefined)
    res.json({ stat: "error", msg: "Required symbol parameter" });
  if (body.timeframe === null || body.timeframe === undefined)
    res.json({ stat: "error", msg: "Required timeframe parameter" });

  //   Syncing data
  const { symbol, timeframe } = body;
  async function syncHistorical(YYYY) {
    const data = await client.stock.historical.candles({
      symbol,
      timeframe,
      from: `${YYYY}-01-01`,
      to: `${YYYY}-12-31`,
      fields: "open,high,low,close,volume",
    });

    await historicalService.update({
      symbol: data.symbol,
      timeframe: data.timeframe,
      data: data.data,
    });

    const currentYYYY = new Date().getFullYear();
    YYYY < currentYYYY && (await delay(1000), syncHistorical(++YYYY));
  }

  syncHistorical(2010);

  res.json({});
}

module.exports = {
  fullHistorical,
};
