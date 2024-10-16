import React from 'react'

interface IndicatorCardProps {
    children: React.ReactNode
}

const IndicatorCardContainer = (props: IndicatorCardProps) => {
    return <section className="p-4 mb-3">{props.children}</section>
}

interface IndicatorCardTitleProps {
    children: React.ReactNode
}

const IndicatorCardHead = (props: IndicatorCardTitleProps) => {
    return (
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {props.children}
        </h3>
    )
}

interface IndicatorCardBodyProps {
    children: React.ReactNode
}

const IndicatorCardBody = (props: IndicatorCardBodyProps) => {
    return <div className="flex flex-wrap">{props.children}</div>
}

const IndicatorCard = () => {}
IndicatorCard.Container = IndicatorCardContainer
IndicatorCard.Head = IndicatorCardHead
IndicatorCard.Body = IndicatorCardBody

export default IndicatorCard
