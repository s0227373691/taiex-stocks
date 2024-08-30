import useATHMaxDrawdown from './useATHMaxDrawdown'
import useCurrentPrice from './useCurrentPrice'

interface useATHMaxDrawdownRatioParams {
    id: string
    timeframe: string
}
const useATHMaxDrawdownRatio = (props: useATHMaxDrawdownRatioParams) => {
    const maxDrawdown = useATHMaxDrawdown({
        id: props.id,
        timeframe: props.timeframe,
    })
    const currentPrice = useCurrentPrice({
        id: props.id,
        timeframe: props.timeframe,
    })
    return (
        currentPrice &&
        maxDrawdown &&
        ((currentPrice / maxDrawdown - 1) * 100).toFixed(2)
    )
}

export default useATHMaxDrawdownRatio
