import { getIndicators } from '@/services/indicator'
import React from 'react'
import IndicatorBadge from './indicator-badge'

interface IndicatorBadgeListProps {
    type?: 'ema' | 'sma' | 'wma'
}

const IndicatorBadgeList = async (props: IndicatorBadgeListProps) => {
    const response = await getIndicators({ type: props.type })

    return (
        <>
            {response?.data.map((el: any) => (
                <IndicatorBadge key={el._id}>
                    {el.type} {el.period}
                </IndicatorBadge>
            ))}
        </>
    )
}

export default IndicatorBadgeList
