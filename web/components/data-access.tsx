'use client'

import { useQuery } from '@tanstack/react-query'
import { getTickers } from '@/config/finance'

export function useTickers() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => getTickers(),
    })
}
