import { useMemo } from 'react'
import { EMA } from 'technicalindicators'

export function useEMA(period: number, values: number[]) {
    return useMemo(
        () => (values ? EMA.calculate({ period, values }) : null),
        [period, values]
    )
}

export function useEMAs(periods: number[], values: number[]) {
    return useMemo(
        () =>
            periods.map((period) =>
                values ? EMA.calculate({ period, values }) : null
            ),
        [periods, values]
    )
}

export function useCurrent(values: number[] | null) {
    return useMemo(() => (values ? values[values.length - 2] : null), [values])
}

export function useCompareValues(value1: number, value2: number) {
    return useMemo(() => {
        if (value1 > value2) return 1
        if (value1 < value2) return -1
        return 0
    }, [value1, value2])
}

export function useVegasTunnel(values: number[]) {
    const [ema12, ema34, ema55, ema144, ema169, ema576, ema676] = useEMAs(
        [12, 34, 55, 144, 167, 576, 676],
        values
    )
    const currentEMA12 = useCurrent(ema12)
    const currentEMA34 = useCurrent(ema34)
    const currentEMA55 = useCurrent(ema55)
    const currentEMA144 = useCurrent(ema144)
    const currentEMA169 = useCurrent(ema169)
    const currentEMA576 = useCurrent(ema576)
    const currentEMA676 = useCurrent(ema676)

    const ema144CompareEMA576 = useCompareValues(currentEMA144, currentEMA576)
    const ema144CompareEMA676 = useCompareValues(currentEMA144, currentEMA676)
    const ema169CompareEMA576 = useCompareValues(currentEMA169, currentEMA576)
    const ema169CompareEMA676 = useCompareValues(currentEMA169, currentEMA676)
    const isTunnelLong = useMemo(
        () =>
            ema144CompareEMA576 === 1 &&
            ema144CompareEMA676 === 1 &&
            ema169CompareEMA576 === 1 &&
            ema169CompareEMA676 === 1,
        [
            ema144CompareEMA576,
            ema144CompareEMA676,
            ema169CompareEMA576,
            ema169CompareEMA676,
        ]
    )
    const isTunnelShort = useMemo(
        () =>
            ema144CompareEMA576 === -1 &&
            ema144CompareEMA676 === -1 &&
            ema169CompareEMA576 === -1 &&
            ema169CompareEMA676 === -1,
        [
            ema144CompareEMA576,
            ema144CompareEMA676,
            ema169CompareEMA576,
            ema169CompareEMA676,
        ]
    )

    return {
        ema12,
        ema34,
        ema55,
        ema144,
        ema169,
        ema576,
        ema676,
        ema144CompareEMA576,
        ema144CompareEMA676,
        ema169CompareEMA576,
        ema169CompareEMA676,
        isTunnelLong,
        isTunnelShort,
        current: {
            ema12: currentEMA12,
            ema34: currentEMA34,
            ema55: currentEMA55,
            ema144: currentEMA144,
            ema169: currentEMA169,
            ema576: currentEMA576,
            ema676: currentEMA676,
        },
    }
}
