'use client'

import React from 'react'
import { useAllHistorical, useSnapshot } from './home-data-access'

export function Snapshot() {
    const { isLoading, data } = useSnapshot()

    if (isLoading) return <>Loading...</>

    // console.log(data)
    return (
        <div>
            snapshot
            {data?.map((el: any) => (
                <div key={el.symbol}>
                    {el.type} {el.symbol}
                </div>
            ))}
        </div>
    )
}

export function AllHistorical() {
    const { isLoading, data } = useAllHistorical()

    if (isLoading) return <>Loading...</>

    // console.log('AllHistorical', data)
    return (
        <div>
            AllHistorical
            {/* {data.map(el => <div>{el.type} {el.symbol}</div>)} */}
        </div>
    )
}
