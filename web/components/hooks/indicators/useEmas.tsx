import { useMemo } from 'react'
import { EMA } from 'technicalindicators'

export default function (periods: number[], values: number[] | undefined) {
    return useMemo(
        () =>
            periods.map((period) => ({
                period,
                values: values && EMA.calculate({ period, values }),
            })),

        [periods, values]
    )
}
