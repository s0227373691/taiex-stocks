'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { StockTypesContext } from './stocks-data-access'
import { tickerType } from '@/services/ticker'

export type StockType = {
    name: string
    isChecked: boolean
}

export type StockTypeContextType = {
    tickers: tickerType[]
    stockTypes: StockType[]
    setStockTypes: Dispatch<SetStateAction<StockType[]>>
    searchKeyword: string
    setSearchKeyword: Dispatch<SetStateAction<string>>
}
interface StocksTableProvidersProps {
    children: ReactNode
    initialTickers: tickerType[]
    searchKeyword: string
}

export default function StockTableProviders(props: StocksTableProvidersProps) {
    const [stockTypes, setStockTypes] = useState([
        { name: 'EQUITY', isChecked: true },
        { name: 'INDEX', isChecked: true },
    ])
    const [searchKeyword, setSearchKeyword] = useState(props.searchKeyword)

    return (
        <StockTypesContext.Provider
            value={{
                tickers: props.initialTickers,
                stockTypes,
                setStockTypes,
                searchKeyword,
                setSearchKeyword,
            }}
        >
            {props.children}
        </StockTypesContext.Provider>
    )
}
