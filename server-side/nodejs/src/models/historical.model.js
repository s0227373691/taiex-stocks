const mongoose = require("mongoose");

const historicalSchema = new mongoose.Schema({
  symbol: String,
  timeframe: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  date: String,
});

const Historical = mongoose.model("Historical", historicalSchema);

module.exports = Historical;
