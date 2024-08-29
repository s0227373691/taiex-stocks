import { useHistorical } from '@/components/data-access'
import useATH from './useATH'
import { useMemo } from 'react'

interface useATHMaxDrawdownParams {
    id: string
    timeframe: string
}

export default function useATHMaxDrawdown(props: useATHMaxDrawdownParams) {
    const { data: allHistorical } = useHistorical({
        id: props.id,
        timeframe: props.timeframe,
    })
    const ath = useATH({ id: props.id, timeframe: props.timeframe })
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
