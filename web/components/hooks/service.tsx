import { fetchServerStatus } from '@/config/finance'
import { useQuery } from '@tanstack/react-query'
import historicalService from '@/services/historical'

export function useGetServerStatus() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => fetchServerStatus(),
    })
}

export function useHistoricalCount(symbol: string) {
    return useQuery({
        queryKey: ['historicalCount', symbol],
        queryFn: () => historicalService.getStockCount(symbol),
    })
}
