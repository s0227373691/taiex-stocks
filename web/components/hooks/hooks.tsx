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
    return useMemo(() => (values ? values[values.length - 1] : null), [values])
}
