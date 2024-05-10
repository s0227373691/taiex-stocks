'use client'

import { useATH, useATHMaxDrawdown, useATHRatio, useAllHistorical, useSnapshot } from "./product-data-access"

export function AllHistorical({id, timeframe}:{id: string, timeframe: string}) {
    const {isLoading, data} = useAllHistorical({id, timeframe})
  
    if(isLoading) return <>Loading...</>
    
    console.log('AllHistorical', data)
    return (
      <div>AllHistorical
          {/* {data.map(el => <div>{el.type} {el.symbol}</div>)} */}
      </div>
    )
  }

export function ATH({id, timeframe}:{id: string, timeframe: string}) {
  const ath = useATH({id, timeframe})
  const athRatio = useATHRatio({id, timeframe})
  return <div>ath: {ath}, athRatio: {athRatio} {athRatio && "%"} </div>
}

export function MaxDrawdown({id, timeframe}:{id: string, timeframe: string}) {
  const maxDrawdown = useATHMaxDrawdown({id, timeframe})
  return <div>MaxDrawdown: {maxDrawdown}</div>

}

export function SymbolList() {
  const {isLoading, data} = useSnapshot()
  console.log(data)

  if(isLoading) return null

  return <div>
    {
      data.map(el => <div key={el.symbol}>{el.symbol} {el.name}</div>)
    }
  </div>
}