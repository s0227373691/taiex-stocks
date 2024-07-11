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
    const response = await client.stock.historical.candles({
      symbol,
      timeframe,
      from: `${YYYY}-01-01`,
      to: `${YYYY}-12-31`,
      fields: "open,high,low,close,volume",
    });

    await historicalService.update({
      symbol: response.symbol,
      timeframe: response.timeframe,
      data: response.data,
    });

    const currentYYYY = new Date().getFullYear();
    YYYY < currentYYYY && (await delay(1000), await syncHistorical(++YYYY));
  }

  await syncHistorical(2010);

  res.json({ symbol, timeframe });
}

async function historicalCount(req, res) {
  //   Check parameters
  if (req.query.symbol === null || req.query.symbol === undefined)
    res.json({ stat: "error", msg: "Required symbol parameter" });

  //   Syncing data
  const { symbol } = req.query;
  const timeframes = ["M", "W", "D"];
  const promise = timeframes.map((timeframe) =>
    historicalService.queryCount({
      symbol,
      timeframe,
    })
  );

  const timeframeCounts = await Promise.all(promise);

  res.json({
    symbol,
    count: {
      M: timeframeCounts[0],
      W: timeframeCounts[1],
      D: timeframeCounts[2],
    },
  });
}

module.exports = {
  fullHistorical,
  historicalCount,
};
