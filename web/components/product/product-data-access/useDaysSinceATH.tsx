import { useHistorical } from '@/components/data-access'
import React, { useMemo } from 'react'

interface useDaysSinceATHParams {
    id: string
}

export default function useDaysSinceATH(props: useDaysSinceATHParams) {
    const { data: historicalData } = useHistorical({
        id: props.id,
        timeframe: 'D',
    })
    return useMemo(() => {
        if (historicalData) {
            let athPrice = 0
            let days = 0

            const candles = historicalData.data[0].candles
            candles.forEach((candle: any) => {
                if (athPrice > candle.high) return days++
                else {
                    athPrice = candle.high
                    days = 0
                }
            })
            return days
        }
    }, [historicalData])
}
