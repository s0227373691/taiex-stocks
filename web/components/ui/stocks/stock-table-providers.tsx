import { ReactNode, useState } from 'react'
import { StockTypesContext } from './stocks-data-access'

interface StocksTableProvidersProps {
    children: ReactNode
}

export default function StockTableProviders(props: StocksTableProvidersProps) {
    const [stockTypes, setStockTypes] = useState([
        { name: 'EQUITY', isChecked: true },
        { name: 'INDEX', isChecked: true },
    ])

    return (
        <StockTypesContext.Provider
            value={{
                stockTypes,
                setStockTypes,
            }}
        >
            {props.children}
        </StockTypesContext.Provider>
    )
}
