import React from 'react'
import IndicatorBadgeList from './indicator-badge'
import CreateEmaIndicatorBadge from './create-ema-indicator-badge'

const EmaIndicatorCard = () => {
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                EMA (Exponential Moving Average)
            </h3>
            <div className="flex">
                <IndicatorBadgeList />
                <CreateEmaIndicatorBadge />
            </div>
        </div>
    )
}

export default EmaIndicatorCard
