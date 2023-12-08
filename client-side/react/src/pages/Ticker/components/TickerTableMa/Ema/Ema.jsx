import { useMemo, useState } from 'react'

import useEMA from '../../../../../hooks/useEMA'

const Ema = ({ histirical, period }) => {
    const ema12 = useEMA(histirical, period)
    const currentPrice = histirical[histirical.length - 1].close
    return (
        <div>Ema {period} {currentPrice > ema12.pop() ? <span style={{ color: 'red' }}>買進</span> : <span style={{ color: 'lime' }}>賣出</span>}</div>
    )
}

export default Ema