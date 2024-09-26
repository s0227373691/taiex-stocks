'use client'

import React from 'react'
import Title from './product-ui/Title'
// import MovingAverages from './product-ui/MovingAverages'
import { useParams } from 'next/navigation'
import PerformanceMetricsOverview from './product-ui/PerformanceMetricsOverview'

export default function ProductFeature() {
    const { productId } = useParams()
    const id = Array.isArray(productId) ? productId.join(',') : productId

    return (
        <div className="w-full h-full flex">
            <div className="w-full">
                <Title id={id} />
                <PerformanceMetricsOverview id={id} timeframe={'M'} />
                {/* <MovingAverages /> */}
            </div>
        </div>
    )
}
