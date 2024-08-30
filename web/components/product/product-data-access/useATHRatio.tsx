import useATH from './useATH'
import useCurrentPrice from './useCurrentPrice'

interface useATHRatioParams {
    id: string
    timeframe: string
}

export default function useATHRatio(props: useATHRatioParams) {
    const ath = useATH({ id: props.id, timeframe: props.timeframe })
    const currentPrice = useCurrentPrice({
        id: props.id,
        timeframe: props.timeframe,
    })

    return ath && currentPrice && ((currentPrice / ath) * 100).toFixed(2)
}
