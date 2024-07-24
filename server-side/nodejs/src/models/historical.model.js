const mongoose = require("mongoose");
const { candleSchema } = require("./candles.model");

const historicalSchema = new mongoose.Schema({
  symbol: {
    type: mongoose.Schema.ObjectId,
    ref: 'tickers',
    require: true
  },
  timeframe: String,
  // candles: [candleSchema],
  candles: [{
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    date: Date,
  }],

});

const HistoricalModel = mongoose.model("Historical", historicalSchema);

module.exports = {
  HistoricalModel,
  historicalSchema
};
