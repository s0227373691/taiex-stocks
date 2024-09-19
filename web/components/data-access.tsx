'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchHistorical } from '@/config/finance'
import tickerService from '@/services/ticker'

export function useTickers() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => tickerService.get(),
    })
}

interface useHistoricalParams {
    id: string
    timeframe: string
}

export function useHistorical({
    id,
    timeframe,
}: useHistoricalParams): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: ['historical', id, timeframe],
        queryFn: () => fetchHistorical(id, timeframe),
    })
}
