'use client'

import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchHistoricalCrypto, fetchPerp } from '@/config/finance'
import { useEffect, useMemo, useState } from 'react'
import { useEMAs } from '../hooks/hooks'
import { EMA } from 'technicalindicators'
import { calcEMAs } from '@/utils'

export function useHistoricalCrypto(symbol: string, timeframe: string) {
    const exchange = 'Binance'
    return useQuery({
        queryKey: ['historical', 'crypto', exchange, symbol, timeframe],
        queryFn: () => fetchHistoricalCrypto(exchange, symbol, timeframe),
    })
}
export function useHistoricalCryptos(_market: any) {
    const [exchange] = useState('Binance')
    const market = useMemo(() => (_market ? _market : []), [_market])

    const historicalQueries = useQueries({
        queries: market.map(
            ({ symbol, timeframe }: { symbol: string; timeframe: string }) => {
                return {
                    queryKey: [
                        'historical',
                        'crypto',
                        exchange,
                        symbol,
                        timeframe,
                    ],
                    queryFn: () =>
                        fetchHistoricalCrypto(exchange, symbol, timeframe),
                }
            }
        ),
    })

    return useMemo(() => {
        // if (!historicals || historicals.length === 0) return null
        for (let i in historicalQueries) {
            if (historicalQueries[i].isLoading) return null
        }

        return historicalQueries.map((el: any) => el.data)
    }, [historicalQueries])
}

export function usePerpMarket() {
    const exchange = 'Binance'
    return useQuery({
        queryKey: ['perpmarket', exchange],
        queryFn: () => fetchPerp(),
    })
}

export function useMutEMA(periods: number[], historicals: any) {
    return useMemo(
        () =>
            historicals &&
            historicals.map((el: any) => {
                const values = el?.data.map((candle: any) => candle.close)
                const emas: any[] = []
                periods.forEach((period) => {
                    const emaValue = EMA.calculate({
                        period,
                        values,
                    })
                    emas[period] = emaValue
                })

                return { emas, ...el }
            }),
        [periods, historicals]
    )
}

export function useWaveRank(timeframe: string) {
    const [periods, setPeriods] = useState([13, 21, 34, 55, 89])
    const { data } = usePerpMarket()
    const historicalCryptosConfig = useMemo(
        () => data?.market.map((el: any) => ({ symbol: el.id, timeframe })),
        [data]
    )

    const historicals = useHistoricalCryptos(historicalCryptosConfig)

    const cryptos = useMutEMA(periods, historicals)

    return { cryptos, emaPeriods: periods }
}
