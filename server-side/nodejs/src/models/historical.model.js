const mongoose = require("mongoose");

const historicalSchema = new mongoose.Schema({
  symbol: {
    type: mongoose.Schema.ObjectId,
    ref: 'tickers',
    require: true
  },
  timeframe: String,
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
