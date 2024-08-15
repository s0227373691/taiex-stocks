'use client'

import { useEffect, useMemo, useState } from 'react'
import { useHistorical, useTickers } from '../data-access'
import { useParams } from 'next/navigation'
import useEmas from '../hooks/indicators/useEmas'
import useSmas from '../hooks/indicators/useSmas'

export function useATH({ id, timeframe }: { id: string; timeframe: string }) {
    const { data: allHistorical } = useHistorical({ id, timeframe })
    return useMemo(() => {
        if (allHistorical) {
            let _ath = 0
            let i = 0
            while (allHistorical.data[0]?.candles.length > i) {
                const { high } = allHistorical.data[0]?.candles[i]
                if (high > _ath) _ath = high
                i++
            }
            return _ath
        }
    }, [allHistorical])
}

export function useCurrentPrice({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { data: allHistorical } = useHistorical({ id, timeframe })
    return useMemo(() => {
        if (allHistorical) {
            const candles = allHistorical.data[0]?.candles
            if (!candles) return null
            const candle = candles[candles?.length - 1]
            return candle?.close
        }
    }, [allHistorical])
}

export function useATHRatio({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const ath = useATH({ id, timeframe })
    const currentPrice = useCurrentPrice({ id, timeframe })

    return useMemo(() => {
        if (ath && currentPrice) {
            return ((currentPrice / ath) * 100).toFixed(2)
        }
    }, [ath])
}

export function useATHMaxDrawdown({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { data: allHistorical } = useHistorical({ id, timeframe })
    const ath = useATH({ id, timeframe })
    return useMemo(() => {
        if (ath) {
            const candles = allHistorical.data[0]?.candles
            let i = candles.length - 1
            let _maxDrawdown = ath

            while (ath !== candles[i].high) {
                const { low } = candles[i]
                if (_maxDrawdown > low) _maxDrawdown = low
                i--
            }
            return _maxDrawdown
        }
    }, [ath])
}

export function useProductInfo(id: string | string[]) {
    const { data } = useTickers()
    return useMemo(() => data?.data.find((el: any) => el.symbol === id), [data])
}

export function useGetCandleClose(candles: any) {
    return useMemo(() => candles?.map((el: any) => el.close), [candles])
}

export function useMA() {
    const { productId } = useParams()
    const [indicatorTypes] = useState([
        { name: 'EMA', value: 'ema' },
        { name: 'SMA', value: 'sma' },
    ])
    const indicatorTypeState = useState(indicatorTypes[0].value)
    const [timeframes] = useState(['M', 'W', 'D'])
    const [periods] = useState([13, 34, 55, 89, 144, 169, 576, 676])
    const [data, setData] = useState<
        { period: number; values: number[] | undefined }[] | null
    >(null)
    const { isLoading, data: histoicalData } = useHistorical({
        id: Array.isArray(productId) ? productId.join(',') : productId,
        timeframe: timeframes[0],
    })
    const values = useGetCandleClose(histoicalData?.data[0]?.candles)
    const emas = useEmas(periods, values)
    const smas = useSmas(periods, values)

    useEffect(() => {
        switch (indicatorTypeState[0]) {
            case 'ema':
                setData(emas)
                break
            case 'sma':
                setData(smas)
                break
            default:
                break
        }
    }, [histoicalData, emas, smas, indicatorTypeState[0]])

    return {
        indicatorTypes,
        indicatorTypeState,
        periods,
        timeframes,
        data,
        isLoading,
    }
}
