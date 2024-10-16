import { getIndicators } from '@/services/indicator'
import React from 'react'

interface IndicatorBadgeListProps {
    type?: 'ema' | 'sma' | 'wma'
}

const IndicatorBadgeList = async (props: IndicatorBadgeListProps) => {
    const indicator = await getIndicators({ type: props.type })
    return (
        <>
            {indicator?.data.map((el: any) => (
                <IndicatorBadge key={el._id}>
                    {el.type} {el.period}
                </IndicatorBadge>
            ))}
        </>
    )
}

export default IndicatorBadgeList

interface IndicatorBadgeProps {
    children: React.ReactNode
    onClick?: () => void
}

function IndicatorBadge(props: IndicatorBadgeProps) {
    return (
        <span
            className="bg-gray-100 text-gray-800 text-xs font-medium mb-2 me-2 px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
            onClick={props.onClick}
        >
            {props.children}
        </span>
    )
}

interface CreateEmaIndicatorBadgeProps {
    onClick: () => void
}

export function CreateEmaIndicatorBadge(props: CreateEmaIndicatorBadgeProps) {
    return <IndicatorBadge onClick={props.onClick}>+</IndicatorBadge>
}
