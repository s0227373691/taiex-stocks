const client = require("../config/fugle.config");
const Product = require('../models/product.model')

async function update(_market) {
    const markets = _market.split(",");
      const result = await Promise.all(
        markets.map(async (market) => {
          const snapshotData = await client.stock.snapshot.quotes({ market });
          return snapshotData.data.map((el) => ({ ...el, market }));
        })
      );
      const reducedResult = result.reduce((a, b) => a.concat(b));
      reducedResult.map(async el => {
        await Product.findOneAndUpdate({symbol: el.symbol}, el, {
          new: true,
          upsert: true,
        })
      })
}

module.exports = {
    update
}