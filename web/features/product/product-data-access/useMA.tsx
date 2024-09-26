import { useEffect, useMemo, useState } from 'react'
import { useHistorical, useTickers } from '../../data-access'
import { useParams } from 'next/navigation'
import useEmas from '../../hooks/indicators/useEmas'
import useSmas from '../../hooks/indicators/useSmas'

export default function useMA() {
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

function useGetCandleClose(candles: any) {
    return useMemo(() => candles?.map((el: any) => el.close), [candles])
}
