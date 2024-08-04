'use client'

import { useMutation } from '@tanstack/react-query'
import { updateTickers } from '@/config/finance'

export function useTickers() {
    return useMutation({ mutationFn: updateTickers })
}
