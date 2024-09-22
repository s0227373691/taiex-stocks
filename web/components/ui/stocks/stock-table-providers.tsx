'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { StockTypesContext } from './stocks-data-access'
import { tickerType } from '@/services/ticker'

export type StockType = {
    name: string
    isChecked: boolean
}

export type StockTypeContextType = {
    stockTypes: StockType[]
    setStockTypes: Dispatch<SetStateAction<StockType[]>>
    tickers: tickerType[]
}
interface StocksTableProvidersProps {
    initialTickers: tickerType[]
    children: ReactNode
}

export default function StockTableProviders(props: StocksTableProvidersProps) {
    const [tickers] = useState(props.initialTickers)
    const [stockTypes, setStockTypes] = useState([
        { name: 'EQUITY', isChecked: true },
        { name: 'INDEX', isChecked: true },
    ])

    return (
        <StockTypesContext.Provider
            value={{
                stockTypes,
                setStockTypes,
                tickers,
            }}
        >
            {props.children}
        </StockTypesContext.Provider>
    )
}
