import React from 'react'
import IndicatorCard from './indicator-card'
import IndicatorBadgeList from './indicator-badge-list'
import {
    CreateEmaIndicatorBadge,
    CreateSmaIndicatorBadge,
    CreateWmaIndicatorBadge,
} from './create-ema-indicator-badge'

export const EmaIndicatorCard = () => {
    return (
        <IndicatorCard.Container>
            <IndicatorCard.Head>
                EMA (Exponential Moving Average)
            </IndicatorCard.Head>
            <IndicatorCard.Body>
                <IndicatorBadgeList type="ema" />
                <CreateEmaIndicatorBadge />
            </IndicatorCard.Body>
        </IndicatorCard.Container>
    )
}

export const SmaIndicatorCard = () => {
    return (
        <IndicatorCard.Container>
            <IndicatorCard.Head>SMA (Simple Moving Average)</IndicatorCard.Head>
            <IndicatorCard.Body>
                <IndicatorBadgeList type="sma" />
                <CreateSmaIndicatorBadge />
            </IndicatorCard.Body>
        </IndicatorCard.Container>
    )
}

export const WmaIndicatorCard = () => {
    return (
        <IndicatorCard.Container>
            <IndicatorCard.Head>
                WMA (Weighted Moving Average)
            </IndicatorCard.Head>
            <IndicatorCard.Body>
                <IndicatorBadgeList type="wma" />
                <CreateWmaIndicatorBadge />
            </IndicatorCard.Body>
        </IndicatorCard.Container>
    )
}
