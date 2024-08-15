'use client'

import React from 'react'
import {
    ATHCard,
    ATHRatioCard,
    MaxDrawdownCard,
    MaxDrawdownRatioCard,
    MovingAverages,
    Title,
} from './product-ui'
import { useParams } from 'next/navigation'

const Feature = () => {
    const { productId } = useParams()

    return (
        <div className="w-full h-full flex">
            <div className="w-full">
                <Title id={productId} />
                <div className="mb-12 p-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    <ATHCard id={productId} timeframe={'M'} />
                    <ATHRatioCard id={productId} timeframe={'M'} />
                    <MaxDrawdownCard id={productId} timeframe={'M'} />
                    <MaxDrawdownRatioCard id={productId} timeframe={'M'} />
                </div>
                <MovingAverages />
            </div>
        </div>
    )
}

export default Feature
