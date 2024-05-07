'use client'

import { useQuery } from '@tanstack/react-query';
import { getSnapshot, getAllHistorical} from '@/config/finance'

export function useSnapshot() {
    return useQuery({
        queryKey: ["snapshot"],
        queryFn: () => getSnapshot("TSE,OTC")
    });
}

export function useAllHistorical() {
    return useQuery({
        queryKey: ["allHistorical"],
        queryFn: () => getAllHistorical("2330", 'M')
    });
}
