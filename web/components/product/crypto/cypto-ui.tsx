'use client'

import { useEffect, useMemo, useState } from 'react'
import { useHistoricalCrypto, useSortEMAs } from './crypto-data-access'
import { useVegasTunnel } from '@/components/hooks/hooks'

export function Wave({
    symbol,
    timeframe,
    title,
}: {
    symbol: string
    timeframe: string
    title: string
}) {
    const { isFetching, data, refetch } = useHistoricalCrypto(symbol, timeframe)
    const values = useMemo(() => data?.data.map((el: any) => el.close), [data])
    const sortEMAs = useSortEMAs(values)
    const [showValue, setShowValue] = useState(false)

    // useEffect(() => {
    //     const intervalId = setInterval(() => refetch(), 30000)
    //     return () => clearInterval(intervalId)
    // }, [])

    return (
        <>
            <div className="h-fit p-4 bg-gray-300 rounded">
                <div className="text-gray-700 font-semibold">
                    {title} {isFetching && `loading ${timeframe}`}
                </div>
                {data && (
                    <div className="flex relative">
                        <ul
                        // onMouseEnter={() => setShowValue(!showValue)}
                        // onMouseLeave={() => setShowValue(!showValue)}
                        >
                            <div>
                                {sortEMAs.map((ema) => (
                                    <li key={ema.period}>
                                        {ema.period === 12 && (
                                            <div className="text-red-600">
                                                ema{ema.period}
                                            </div>
                                        )}
                                        {ema.period === 34 && (
                                            <div className="text-yellow-600">
                                                ema{ema.period}
                                            </div>
                                        )}
                                        {ema.period === 55 && (
                                            <div className="text-green-600">
                                                ema{ema.period}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </div>
                        </ul>
                        {showValue && (
                            <div className="absolute z-10 bg-gray-600 flex flex-col rounded p-4">
                                {sortEMAs.map(({ value }) => (
                                    <span>{value}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export function WrappedWave({ symbol }: { symbole: string }) {
    return (
        <div>
            <div className="flex gap-4 p-4">
                <Wave symbol={symbol} timeframe={'1M'} title="Month" />
                <Wave symbol={symbol} timeframe={'1w'} title="Week" />
                <Wave symbol={symbol} timeframe={'3d'} title="3Day" />
                <Wave symbol={symbol} timeframe={'1d'} title="1Day" />
            </div>
            <div className="flex gap-4 p-4">
                <Wave symbol={symbol} timeframe={'12h'} title="12 hours" />
                <Wave symbol={symbol} timeframe={'8h'} title="8 hours" />
                <Wave symbol={symbol} timeframe={'6h'} title="6 hours" />
                <Wave symbol={symbol} timeframe={'4h'} title="4 hours" />
                <Wave symbol={symbol} timeframe={'2h'} title="2 hours" />
                <Wave symbol={symbol} timeframe={'1h'} title="1 hours" />
            </div>
            <div className="flex gap-4 p-4">
                <Wave symbol={symbol} timeframe={'30m'} title="30 minutes" />
                <Wave symbol={symbol} timeframe={'15m'} title="15 minutes" />
                <Wave symbol={symbol} timeframe={'5m'} title="5 minutes" />
                <Wave symbol={symbol} timeframe={'3m'} title="3 minutes" />
                <Wave symbol={symbol} timeframe={'1m'} title="1 minutes" />
            </div>
        </div>
    )
}
