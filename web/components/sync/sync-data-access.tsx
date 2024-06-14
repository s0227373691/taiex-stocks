'use client'

import { getSnapshot } from '@/config/finance'
import { useQuery } from '@tanstack/react-query'

export function useSnapshot() {
    return useQuery({
        queryKey: ['snapshot'],
        queryFn: () => getSnapshot('TSE,OTC'),
    })
}
