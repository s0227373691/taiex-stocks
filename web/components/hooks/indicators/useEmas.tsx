import { useMemo } from 'react'
import { EMA } from 'technicalindicators'

const useEmas = (periods: number[], values: number[] | undefined) => {
    return useMemo(
        () =>
            periods.map((period) => ({
                period,
                values: values && EMA.calculate({ period, values }),
            })),

        [periods, values]
    )
}
export default useEmas
