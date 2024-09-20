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

export const useStockTable = () => {
    const { data } = useTickers()
    const stockTypesContext = useContext(StockTypesContext)
    const computeData = useMemo(() => {
        if (!data || !stockTypesContext) return data
        const tickerData = data.data
        const { stockTypes } = stockTypesContext

        const isStockTypesAllChecked = stockTypes.every((el) => el.isChecked)
        if (isStockTypesAllChecked) return tickerData

        const checkedStockTypes = stockTypes
            .filter((el) => el.isChecked)
            .map((el) => el.name)

        return tickerData.filter((el: any) =>
            checkedStockTypes.includes(el.type)
        )
    }, [data, stockTypesContext?.stockTypes])

    return { data: computeData, ...stockTypesContext }
}
