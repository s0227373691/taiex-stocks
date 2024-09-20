import { useTickers } from '@/components/data-access'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
} from 'react'

export type StockType = {
    name: string
    isChecked: boolean
}

type StockTypeContextType = {
    stockTypes: StockType[]
    setStockTypes: Dispatch<SetStateAction<StockType[]>>
}

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
    const { data } = useTickers()
    const stockTypesContext = useStockTableContext()
    const { stockTypes } = stockTypesContext
    const computeData = useMemo(() => {
        if (!data) return []
        const tickerData = data.data
        const isStockTypesAllChecked = stockTypes.every((el) => el.isChecked)
        if (isStockTypesAllChecked) return tickerData

        const checkedStockTypes = stockTypes
            .filter((el) => el.isChecked)
            .map((el) => el.name)

        return tickerData.filter((el: any) =>
            checkedStockTypes.includes(el.type)
        )
    }, [data, stockTypes])

    return { data: computeData, ...stockTypesContext }
}
