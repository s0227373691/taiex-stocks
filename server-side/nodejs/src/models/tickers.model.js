const mongoose = require('mongoose')
const { historicalSchema } = require('./historical.model')

const TickersSchema = new mongoose.Schema({
    market: String,
    type: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    updateTime: {
        type: Date,
        required: true,
    },
    historicals: [historicalSchema]

});

const Tickers = mongoose.model('Tickers', TickersSchema);

module.exports = Tickers