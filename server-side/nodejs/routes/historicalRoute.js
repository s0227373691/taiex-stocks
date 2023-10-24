const router = require('express').Router()
const client = require('../fugle')
const delay = require('../utils/delay')

router.get('/', (req, res) => {
    (async () => {
        await delay(1000)
        const data = await client.stock.historical.candles({ symbol: '0050', timeframe: 'M', from: '2023-01-01', to: '2023-12-31', fields: 'open,high,low,close,volume,change' })
        //    .then(data => console.log(data));
        res.json(data)
    })()
})

module.exports = router

