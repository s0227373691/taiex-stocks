'use client'

import { useMutation } from '@tanstack/react-query'
import tickerService from '@/services/ticker'

export function useTickers() {
    return useMutation({ mutationFn: tickerService.update })
}
