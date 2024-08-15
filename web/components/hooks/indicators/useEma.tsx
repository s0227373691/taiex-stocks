import { useMemo } from 'react'
import { EMA } from 'technicalindicators'

export default function (period: number, values: number[]) {
    return useMemo(
        () => (values ? EMA.calculate({ period, values }) : null),
        [period, values]
    )
}
