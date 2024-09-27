import { useMemo } from 'react'
import { EMA } from 'technicalindicators'

const useEma = (period: number, values: number[]) => {
    return useMemo(
        () => (values ? EMA.calculate({ period, values }) : null),
        [period, values]
    )
}

export default useEma
