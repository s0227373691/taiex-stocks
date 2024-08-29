import { fetchServerStatus } from '@/config/finance'
import { useQuery } from '@tanstack/react-query'

export function useGetServerStatus() {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: () => fetchServerStatus(),
    })
}
