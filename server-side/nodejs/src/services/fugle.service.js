
const client = require("../config/fugle.config");
const delay = require("../utils/delay");

async function fetchTickers({ type, exchange, market }) {
    return await client.stock.intraday.tickers({
        type,
        exchange,
        market
    });

}

async function fetchFullEquity() {
    const twseEquitys = await fetchTickers({ type: 'EQUITY', exchange: 'TWSE' })
    await delay(1000)
    const tpexEquitys = await fetchTickers({ type: 'EQUITY', exchange: 'TPEx' })
    await delay(1000)

    const tikersTwseEquity = twseEquitys?.data.map(twseEquity => ({
        ...twseEquity,
        date: twseEquitys.date,
        type: twseEquitys.type,
        exchange: twseEquitys.exchange,
    })).filter(el => el.name)

    const tikersTpexEquity = tpexEquitys?.data.map(tpexEquity => ({
        ...tpexEquity,
        date: tpexEquitys.date,
        type: tpexEquitys.type,
        exchange: tpexEquitys.exchange,
    })).filter(el => el.name)

    return { tikers: [...tikersTwseEquity, ...tikersTpexEquity] }
}

async function fetchFullIndex() {
    const twseIndex = await fetchTickers({ type: 'INDEX', exchange: 'TWSE' })
    await delay(1000)
    const tpexIndex = await fetchTickers({ type: 'INDEX', exchange: 'TPEx' })
    await delay(1000)

    return { tikers: [twseIndex, tpexIndex] }
}

async function fetchFullCandles({ symbol, timeframe }) {
    const candles = []
    async function syncHistorical(YYYY) {
        const response = await client.stock.historical.candles({
            symbol,
            timeframe,
            from: `${YYYY}-01-01`,
            to: `${YYYY}-12-31`,
            fields: "open,high,low,close,volume",
        });


        if (response.statusCode !== 404) {
            candles.push(...response.data)
        }

        const currentYYYY = new Date().getFullYear();
        YYYY < currentYYYY && (await delay(1000), await syncHistorical(++YYYY));
    }

    await syncHistorical(2010);

    return candles.map(candle => ({
        ...candle,
        date: new Date(candle.date)
    })).sort((a, b) => a.date - b.date);
}

module.exports = {
    fetchTickers,
    fetchFullEquity,
    fetchFullIndex,
    fetchFullCandles
}