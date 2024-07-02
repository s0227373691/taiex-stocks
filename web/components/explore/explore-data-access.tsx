'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchHistoricalCrypto } from '@/config/finance'

export function useHistoricalCrypto(symbol: string, timeframe: string) {
    const exchange = 'Binance'
    return useQuery({
        queryKey: ['historical', 'crypto', exchange, symbol, timeframe],
        queryFn: () => fetchHistoricalCrypto(exchange, symbol, timeframe),
    })
}
