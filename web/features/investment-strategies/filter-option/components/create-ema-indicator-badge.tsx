'use client'

import IndicatorBadge from './indicator-badge'
import indicatorService from '@/services/indicator'

export const CreateEmaIndicatorBadge = () => {
    const handlerCreateEma = () => {
        const period = prompt('Input EMA period')
        indicatorService.createIndicators({
            type: 'ema',
            period: Number(period),
        })
    }
    return <IndicatorBadge onClick={handlerCreateEma}>+</IndicatorBadge>
}

export const CreateSmaIndicatorBadge = () => {
    const handlerCreateSma = () => {
        const period = prompt('Input SMA period')
        indicatorService.createIndicators({
            type: 'sma',
            period: Number(period),
        })
    }
    return <IndicatorBadge onClick={handlerCreateSma}>+</IndicatorBadge>
}

export const CreateWmaIndicatorBadge = () => {
    const handlerCreateWma = () => {
        const period = prompt('Input WMA period')
        indicatorService.createIndicators({
            type: 'wma',
            period: Number(period),
        })
    }
    return <IndicatorBadge onClick={handlerCreateWma}>+</IndicatorBadge>
}
