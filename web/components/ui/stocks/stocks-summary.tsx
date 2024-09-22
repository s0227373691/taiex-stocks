import React from 'react'
import tickerService from '@/services/ticker'

const StocksSummary = async () => {
    const res = await tickerService.get()
    return (
        <div className="mb-8">
            <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                All stocks
            </h3>
            <p className="text-sm text-gray-300">
                {res?.data.length || 0} tickers
            </p>
        </div>
    )
}

export default StocksSummary
