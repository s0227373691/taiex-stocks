import './TickerTableMa.css'
import Placeholder from 'react-bootstrap/Placeholder';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useQuery } from 'react-query'

import fetchAllHistorical from '../../../../services/fetchAllHistorical'

import Ema from './Ema/Ema'
import { useEffect, useMemo } from 'react';
const TickerTableMa = ({ currentTimeframe }) => {
    const { isLoading, isError, error, data: histiricalData, isFetching, refetch } = useQuery('allHistorical', () => fetchAllHistorical(2330, currentTimeframe))

    useEffect(() => {
        refetch()
    }, [currentTimeframe])

    const computeHistoricalData = useMemo(() => {
        if (!histiricalData) return null
        let historicalHigh = histiricalData.data[0].high
        let historicalHighCount = 0
        let historicalHighDate = null
        const computed = histiricalData.data.map(k => {
            if (k.high > historicalHigh) {
                historicalHigh = k.high
                historicalHighCount++
                historicalHighDate = k.date
            }
            return ({ ...k, historicalHigh, historicalHighCount, historicalHighDate })
        })
        console.table(computed)
        return computed
    }, [histiricalData])

    const ath = computeHistoricalData[computeHistoricalData.length - 1].historicalHigh
    const currentClosePrice = computeHistoricalData[computeHistoricalData.length - 1].close
    const athLevel = (currentClosePrice / ath * 100).toFixed(2)

    return (
        <div>
            {isLoading ? <Placeholder animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder> :
                isError ? <p>{error}</p> :
                    <div>
                        <div>歷史新高 {ath}</div>
                        <div>歷史新高水位 {athLevel} %</div>
                        <ListGroup>
                            <Ema period={12} histirical={histiricalData.data} />
                            <Ema period={34} histirical={histiricalData.data} />
                            <Ema period={55} histirical={histiricalData.data} />
                            <Ema period={144} histirical={histiricalData.data} />
                            <Ema period={169} histirical={histiricalData.data} />
                            <Ema period={576} histirical={histiricalData.data} />
                            <Ema period={676} histirical={histiricalData.data} />
                        </ListGroup>
                    </div>
            }
        </div>
    )
}

export default TickerTableMa