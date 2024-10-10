import React from 'react'

const IndicatorBadgeList = () => {
    const data = [
        { id: 'aksbdq,bfq', name: 'EMA', type: 'ema', period: 12 },
        { id: 'akdewshtr', name: 'EMA', type: 'ema', period: 34 },
        { id: 'sxvrthe', name: 'EMA', type: 'ema', period: 55 },
        { id: 'fdgynfb', name: 'SMA', type: 'sma', period: 34 },
        { id: 'xcver', name: 'SMA', type: 'sma', period: 55 },
    ]
    return (
        <div className="flex">
            {data.map((el) => (
                <IndicatorBadge key={el.id} {...el} />
            ))}
        </div>
    )
}

export default IndicatorBadgeList

interface IndicatorBadgeProps {
    id: string
    name: string
    type: string
    period: number
}

function IndicatorBadge(props: IndicatorBadgeProps) {
    return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300">
            {props.name} {props.period}
        </span>
    )
}
