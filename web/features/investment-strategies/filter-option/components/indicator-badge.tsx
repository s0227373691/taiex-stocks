import { getIndicators } from '@/services/indicator'
import React from 'react'

const IndicatorBadgeList = async () => {
    const indicator = await getIndicators()
    console.log(indicator)
    return (
        <>
            {indicator?.data.map((el: any) => (
                <IndicatorBadge key={el._id} {...el} />
            ))}
        </>
    )
}

export default IndicatorBadgeList

interface IndicatorBadgeProps {
    _id: string
    type: string
    period: number
}

function IndicatorBadge(props: IndicatorBadgeProps) {
    return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300">
            {props.type} {props.period}
        </span>
    )
}
