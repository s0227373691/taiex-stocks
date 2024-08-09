'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchHistorical, getSnapshot } from '@/config/finance'

export function useSnapshot() {
    return useQuery({
        queryKey: ['snapshot'],
        queryFn: () => getSnapshot('TSE,OTC'),
    })
}

export function useAllHistorical({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    return useQuery({
        queryKey: ['allHistorical', id, timeframe],
        queryFn: () => fetchHistorical(id, timeframe),
    })
}

export function useATH({ id, timeframe }: { id: string; timeframe: string }) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })
    return useMemo(() => {
        if (allHistorical) {
            let _ath = 0
            let i = 0
            while (allHistorical.data[0]?.candles.length > i) {
                const { high } = allHistorical.data[0]?.candles[i]
                if (high > _ath) _ath = high
                i++
            }
            return _ath
        }
    }, [allHistorical])
}

export function useCurrentPrice({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })
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

export function useATHMaxDrawdown({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })
    const ath = useATH({ id, timeframe })
    return useMemo(() => {
        if (ath) {
            const candles = allHistorical.data[0]?.candles
            let i = candles.length - 1
            let _maxDrawdown = ath

            while (ath !== candles[i].high) {
                const { low } = candles[i]
                if (_maxDrawdown > low) _maxDrawdown = low
                i--
            }
            return _maxDrawdown
        }
    }, [ath])
}

export function useProductInfo(id: string | string[]) {
    const { data } = useSnapshot()
    return useMemo(() => data?.find((el: any) => el.symbol === id), [data])
}
