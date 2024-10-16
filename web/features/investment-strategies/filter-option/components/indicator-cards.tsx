'use client'

import React from 'react'
import IndicatorCard from './indicator-card'
import IndicatorBadgeList, { CreateEmaIndicatorBadge } from './indicator-badge'
import indicatorService from '@/services/indicator'

export const EmaIndicatorCard = () => {
    const handlerCreateEma = () => {
        const period = prompt('Input EMA period')
        indicatorService.createIndicators({
            type: 'ema',
            period: Number(period),
        })
    }
    return (
        <IndicatorCard.Container>
            <IndicatorCard.Head>
                EMA (Exponential Moving Average)
            </IndicatorCard.Head>
            <IndicatorCard.Body>
                <IndicatorBadgeList type="ema" />
                <CreateEmaIndicatorBadge onClick={handlerCreateEma} />
            </IndicatorCard.Body>
        </IndicatorCard.Container>
    )
}

export const SmaIndicatorCard = () => {
    const handlerCreateSma = () => {
        const period = prompt('Input SMA period')
        indicatorService.createIndicators({
            type: 'sma',
            period: Number(period),
        })
    }
    return (
        <IndicatorCard.Container>
            <IndicatorCard.Head>SMA (Simple Moving Average)</IndicatorCard.Head>
            <IndicatorCard.Body>
                <IndicatorBadgeList type="sma" />
                <CreateEmaIndicatorBadge onClick={handlerCreateSma} />
            </IndicatorCard.Body>
        </IndicatorCard.Container>
    )
}
