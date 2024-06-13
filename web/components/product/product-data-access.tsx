'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllHistorical, getSnapshot } from '@/config/finance'

interface allHistoricalInterface {
    id: string
    timeframe: string
}

export function useSnapshot() {
    return useQuery({
        queryKey: ['snapshot'],
        queryFn: () => getSnapshot('TSE,OTC'),
    })
}

export function useAllHistorical({ id, timeframe }: allHistoricalInterface) {
    return useQuery({
        queryKey: ['allHistorical', id, timeframe],
        queryFn: () => getAllHistorical(id, timeframe),
    })
}

export function useATH({ id, timeframe }: allHistoricalInterface) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })

    const ath = useMemo(() => {
        console.log(allHistorical)
        if (allHistorical) {
            let _ath = 0
            let i = 0
            while (allHistorical.data.length > i) {
                const { high } = allHistorical.data[i]
                if (high > _ath) _ath = high
                i++
            }
            return _ath
        }
    }, [allHistorical])
    return ath
}

export function useCurrentPrice({ id, timeframe }: allHistoricalInterface) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })
    return useMemo(() => {
        if (allHistorical) {
            const candle = allHistorical.data[allHistorical.data.length - 1]
            return candle?.close
        }
    }, [allHistorical])
}

export function useATHRatio({ id, timeframe }: allHistoricalInterface) {
    const ath = useATH({ id, timeframe })
    const currentPrice = useCurrentPrice({ id, timeframe })

    return useMemo(() => {
        if (ath && currentPrice) {
            return ((currentPrice / ath) * 100).toFixed(2)
        }
    }, [ath])
}

export function useATHMaxDrawdown({ id, timeframe }: allHistoricalInterface) {
    const { data: allHistorical } = useAllHistorical({ id, timeframe })
    const ath = useATH({ id, timeframe })
    const maxDrawdown = useMemo(() => {
        if (ath) {
            let i = allHistorical.data.length - 1
            let _maxDrawdown = ath
            while (ath !== allHistorical.data[i].high) {
                const { low } = allHistorical.data[i]
                if (_maxDrawdown > low) _maxDrawdown = low
                i--
            }
            return _maxDrawdown
        }
    }, [ath])

    return maxDrawdown
}
