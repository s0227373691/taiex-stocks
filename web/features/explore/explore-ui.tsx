import { useMemo } from 'react'
import { useVegasTunnel } from '@/components/hooks/hooks'
import {
    useHistoricalCrypto,
    useHistoricalCryptos,
    useWaveRank,
} from './explore-data-access'

export function PerpList() {
    const data = useWaveRank('1w')
    // console.log(data)
    return (
        <>
            <div>{/* {data?.exchange} {data?.market.length} */}</div>
            <div>
                {/* {data?.map((el, i) => (
                    <li key={i}>
                        {el?.data?.symbol} {el?.data?.data?.length} {el.status}
                        {el.isLoading && 'Loading...'}
                    </li>
                ))} */}
            </div>
        </>
    )
}
