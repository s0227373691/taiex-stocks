import { useMemo } from 'react'
import { useHistorical } from '@/components/data-access'

interface useATHParams {
    id: string
    timeframe: string
}

export default function useATH(props: useATHParams) {
    const { data: allHistorical } = useHistorical({
        id: props.id,
        timeframe: props.timeframe,
    })
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
