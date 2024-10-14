const mongoose = require("mongoose");

const indicatorSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["ema", "sma"],
    require: true,
  },
  period: {
    type: Number,
    require: true,
  },
});

indicatorSchema.index({ type: 1, period: 1 }, { unique: true });

const Indicator = mongoose.model("Indicator", indicatorSchema);

module.exports = Indicator;
