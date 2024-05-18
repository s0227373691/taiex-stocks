'use client'

import React from 'react'
import {
    ATH,
    AllHistorical,
    ATHCard,
    ATHRatioCard,
    MaxDrawdown,
    SymbolList,
    MaxDrawdownCard,
    MaxDrawdownRatioCard,
} from './product-ui'
import { useParams } from 'next/navigation'

export default () => {
    const { productId } = useParams()

    return (
        <div className="w-full h-full flex">
            <div className="w-full">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    <ATHCard id={productId} timeframe={'M'} />
                    <ATHRatioCard id={productId} timeframe={'M'} />
                    <MaxDrawdownCard id={productId} timeframe={'M'} />
                    <MaxDrawdownRatioCard id={productId} timeframe={'M'} />
                </div>
            </div>
            <SymbolList />
        </div>
    )
}
