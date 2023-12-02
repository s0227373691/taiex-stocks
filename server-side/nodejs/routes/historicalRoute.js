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

router.get('/:symbol/all/:timeframe', (req, res) => {
    let info = {}
    let allHistorical = []
    const fetchHistorical = async (YYYY = new Date().getFullYear()) => {
        const response = await client.stock.historical.candles({
            symbol: req.params.symbol,
            timeframe: req.params.timeframe,
            from: `${YYYY}-01-01`, to: `${YYYY}-12-31`,
            fields: 'open,high,low,close,volume,change'
        })
        if (response.message === 'Resource Not Found') return

        let { data, ...otherInfo } = response
        info = otherInfo
        await delay(1010)
        if (data === undefined) {
            await fetchHistorical(YYYY)
        } else {
            data = data.reverse()
            allHistorical = [...data, ...allHistorical]
            await fetchHistorical(YYYY - 1)
        }
    }

    const main = async () => {
        if (req.session.cookie.historical.isBusy) return res.json({ status: 500, msg: 'historical route is busy' })

        req.session.cookie.historical.isBusy = true
        await fetchHistorical()
        req.session.cookie.historical.isBusy = false
        res.json({ ...info, limit: allHistorical.length, data: allHistorical })
    }
    main()
})

module.exports = router

