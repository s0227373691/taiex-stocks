import { createContext, useContext, useMemo } from 'react'
import { StockTypeContextType } from './stock-table-providers'

export const StockTypesContext = createContext<StockTypeContextType | null>(
    null
)

export const useStockTableContext = () => {
    const context = useContext(StockTypesContext)
    if (!context)
        throw new Error(
            'useStockTableContext should be used within the scope of StockTable component'
        )
    return context
}

export const useStockTable = () => {
    const { tickers } = useStockTableContext()
    const stockTypesContext = useStockTableContext()
    const { stockTypes } = stockTypesContext
    const computeData = useMemo(() => {
        const isStockTypesAllChecked = stockTypes.every((el) => el.isChecked)
        if (isStockTypesAllChecked) return tickers

        const checkedStockTypes = stockTypes
            .filter((el) => el.isChecked)
            .map((el) => el.name)

        return tickers.filter((el: any) => checkedStockTypes.includes(el.type))
    }, [tickers, stockTypes])

    return { data: computeData, ...stockTypesContext }
}
