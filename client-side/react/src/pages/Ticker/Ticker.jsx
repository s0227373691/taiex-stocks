import './Ticker.css'
import React from 'react'
import { useQuery } from 'react-query'

import fetchTickerInfo from '../../services/fetchTickerInfo'
import fetchConstant from '../../services/fetchConstant'

const Ticker = () => {
    const tickerInfoResult = useQuery('tickerInfo', () => fetchTickerInfo(2330))
    const constantResult = useQuery('constant', () => fetchConstant(2330))

    if (tickerInfoResult.isLoading || constantResult.isLoading) {
        return <span>Loading...</span>
    }

    if (tickerInfoResult.isError) {
        return <span>Error: {tickerInfoResult.error.message}</span>
    }

    const tickerInfo = tickerInfoResult.data
    const constant = constantResult.data.data
    console.log(tickerInfo)
    console.log(constant)

    const { name: industry } = constant.industry.find(el => el.code === tickerInfo.industry)
    return (
        <div>
            <div>
                <div>
                    <span>{tickerInfo.name}</span>
                </div>
                <div>
                    <span>{tickerInfo.symbol} {industry}</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Ticker