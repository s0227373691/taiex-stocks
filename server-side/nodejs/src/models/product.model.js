const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    market: String,
    type: String,
    symbol: String,
    name: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product