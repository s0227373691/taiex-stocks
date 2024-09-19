import { useQuery } from '@tanstack/react-query'
import historicalService from '@/services/historical'
import serverService from '@/services/server'

export function useGetServerStatus() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => serverService.getStatus(),
    })
}

export function useHistoricalCount(symbol: string) {
    return useQuery({
        queryKey: ['historicalCount', symbol],
        queryFn: () => historicalService.getStockCount(symbol),
    })
}
