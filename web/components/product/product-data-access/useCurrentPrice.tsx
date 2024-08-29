import { useMemo } from 'react'
import { useHistorical } from '../../data-access'

interface useCurrentPriceParams {
    id: string
    timeframe: string
}

export default function useCurrentPrice(props: useCurrentPriceParams) {
    const { data: allHistorical } = useHistorical({
        id: props.id,
        timeframe: props.timeframe,
    })
    return useMemo(() => {
        if (allHistorical) {
            const candles = allHistorical.data[0]?.candles
            if (!candles) return null
            const candle = candles[candles?.length - 1]
            return candle?.close
        }
    }, [allHistorical])
}
