'use client'

import { useQuery } from '@tanstack/react-query'
import { getTickers, fetchHistorical } from '@/config/finance'

export function useTickers() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => getTickers(),
    })
}

export function useHistorical({
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
