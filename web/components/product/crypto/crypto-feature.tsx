'use client'

import React from 'react'

import { useParams } from 'next/navigation'
import { WrappedWave } from './cypto-ui'

export default () => {
    const { productId } = useParams()

    const symbol = 'SOLUSDT'
    return (
        <>
            <div>
                <div>{symbol}</div>
                <WrappedWave symbol={symbol} />
            </div>
        </>
    )
}
