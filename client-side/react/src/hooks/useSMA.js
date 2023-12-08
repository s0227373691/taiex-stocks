import { useMemo } from 'react'
import { SMA } from 'technicalindicators'

const useSMA = (historical, period) => {
    if (!historical) return

    const sma = useMemo(() => {
        const closePrices = historical.map(el => el.close)
        return SMA.calculate({ period, values: closePrices })
    }, [historical])

    return sma
}

export default useSMA