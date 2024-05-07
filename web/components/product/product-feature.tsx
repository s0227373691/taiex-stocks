'use client'

import React from 'react'
import { ATH, AllHistorical, MaxDrawdown } from './product-ui'
import { useParams } from 'next/navigation'

export default () => {
  const { productId } = useParams()
  
  return (
    <div>
      <h2>{productId}</h2>
      <AllHistorical id={productId} timeframe={"M"} />
      <ATH id={productId} timeframe={"M"} />
      <MaxDrawdown id={productId} timeframe={"M"} />
    </div>
  )
}
