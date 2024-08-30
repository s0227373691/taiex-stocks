'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getTickers, fetchHistorical } from '@/config/finance'

export function useTickers() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => getTickers(),
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
