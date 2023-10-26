const router = require('express').Router()
const { response } = require('express')
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

router.get('/:symbol/all/', (req, res) => {
    let info = {}
    let allHistorical = []
    const fetchHistorical = async (YYYY = new Date().getFullYear()) => {
        const response = await client.stock.historical.candles({
            symbol: req.params.symbol,
            timeframe: 'M',
            from: `${YYYY}-01-01`, to: `${YYYY}-12-31`,
            fields: 'open,high,low,close,volume,change'
        })
        if (response.message === 'Resource Not Found') return

        const { data, ...otherInfo } = response
        info = otherInfo
        allHistorical = [...data, ...allHistorical]
        await delay(1000)
        await fetchHistorical(YYYY - 1)
    }

    const main = async () => {
        await fetchHistorical()
        res.json({ ...info, limit: allHistorical.length, data: allHistorical })
    }
    main()
})

module.exports = router

