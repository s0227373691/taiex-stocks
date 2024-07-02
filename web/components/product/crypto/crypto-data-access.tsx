'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchHistoricalCrypto } from '@/config/finance'
import { useVegasTunnel } from '@/components/hooks/hooks'

export function useHistoricalCrypto(symbol: string, timeframe: string) {
    const exchange = 'Binance'
    return useQuery({
        queryKey: ['historical', 'crypto', exchange, symbol, timeframe],
        queryFn: () => fetchHistoricalCrypto(exchange, symbol, timeframe),
    })
}

export function useSortEMAs(values: number[]) {
    const veagas = useVegasTunnel(values)
    return useMemo(() => {
        const { ema12, ema34, ema55 } = veagas?.current
        const emas = []
        emas.push({
            period: 12,
            value: ema12,
        })
        emas.push({
            period: 34,
            value: ema34,
        })
        emas.push({
            period: 55,
            value: ema55,
        })
        emas.sort((a, b) => (a.value > b.value ? -1 : 1))
        return emas
    }, [veagas])
}

export function useSymbol() {
    return useState('BTCUSDT')
}
