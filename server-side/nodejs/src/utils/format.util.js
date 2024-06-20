const binance = (data) => {
  return data.map((candle) => ({
    open: candle[0],
    high: candle[1],
    low: candle[2],
    close: candle[3],
    volume: candle[4],
  }));
};

module.exports = {
  binance,
};
