import { useMemo } from 'react'
import { SMA } from 'technicalindicators'

export default function (periods: number[], values: number[] | undefined) {
    return useMemo(
        () =>
            periods.map((period) => ({
                period,
                values: values && SMA.calculate({ period, values }),
            })),

        [periods, values]
    )
}
