'use client'

import { useMemo } from 'react'
import { useHistorical, useTickers } from '../data-access'
import useATH from './product-data-access/useATH'

export function useCurrentPrice({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { data: allHistorical } = useHistorical({ id, timeframe })
    return useMemo(() => {
        if (allHistorical) {
            const candles = allHistorical.data[0]?.candles
            if (!candles) return null
            const candle = candles[candles?.length - 1]
            return candle?.close
        }
    }, [allHistorical])
}

export function useATHRatio({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const ath = useATH({ id, timeframe })
    const currentPrice = useCurrentPrice({ id, timeframe })

    return useMemo(() => {
        if (ath && currentPrice) {
            return ((currentPrice / ath) * 100).toFixed(2)
        }
    }, [ath])
}
