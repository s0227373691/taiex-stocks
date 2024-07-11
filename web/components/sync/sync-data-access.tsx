'use client'

import { fetchHistoricalCount, getSnapshot } from '@/config/finance'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { syncFullHistorical } from '@/config/finance'
import { delay } from '@/utils'

export function useSnapshot() {
    return useQuery({
        queryKey: ['snapshot'],
        queryFn: () => getSnapshot('TSE,OTC'),
    })
}

export function useTaixe() {
    const { data } = useSnapshot()
    const [stocks, setStocks] = useState(null)

    useEffect(() => {
        const _stocks = data
            ?.filter((el: any) => el.symbol.length === 4)
            .map((el: any) => ({ ...el, isActive: false }))

        setStocks(_stocks)
    }, [data])

    const setStatus = ({
        symbol,
        isActive,
    }: {
        symbol: string
        isActive: boolean
    }) => {
        setStocks((prev) => {
            const selected = prev.find((stock) => stock.symbol === symbol)
            const newStocks = [...prev]

            const index = newStocks.indexOf(selected)
            newStocks[index] = { ...selected, isActive }
            return newStocks
        })
    }

    const syncFullTimeframe = async (symbol: string) => {
        console.log('Starting sync')
        console.log('Syncing', 'Month', symbol, '...')
        setStatus({ symbol, isActive: true })
        await syncFullHistorical(symbol, 'M')
        await delay(1000)

        console.log('Syncing', 'Week', symbol, '...')
        await syncFullHistorical(symbol, 'W')
        await delay(1000)

        console.log('Syncing', 'Day', symbol, '...')
        await syncFullHistorical(symbol, 'D')
        await delay(1000)

        console.log('Final', symbol)
        setStatus({ symbol, isActive: false })
    }

    return { stocks, syncFullTimeframe }
}

export function useSyncTaixe() {
    const [status, setStatus] = useState('Inactive')
    const syncFullTimeframe = async (symbol: string) => {
        console.log('Starting sync')
        console.log('Syncing', 'Month', symbol, '...')
        setStatus('Active')
        await syncFullHistorical(symbol, 'M')
        await delay(1000)

        console.log('Syncing', 'Week', symbol, '...')
        await syncFullHistorical(symbol, 'W')
        await delay(1000)

        console.log('Syncing', 'Day', symbol, '...')
        await syncFullHistorical(symbol, 'D')
        await delay(1000)

        console.log('Final', symbol)
        setStatus('Inactive')
    }
}

export function useHistoricalCount(symbol: string) {
    return useQuery({
        queryKey: ['historicalCount', symbol],
        queryFn: () => fetchHistoricalCount(symbol),
    })
}
