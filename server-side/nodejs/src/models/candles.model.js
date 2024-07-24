const mongoose = require("mongoose");

const candleSchema = new mongoose.Schema({
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  date: Date,
});

const CandleModel = mongoose.model("Candle", candleSchema);

module.exports = {
  CandleModel,
  candleSchema
};
