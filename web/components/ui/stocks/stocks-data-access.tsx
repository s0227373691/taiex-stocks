import { useTickers } from '@/components/data-access'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react'

export type StockType = {
    name: string
    isChecked: boolean
}

function useStockTypesState() {
    return useState([
        { name: 'EQUITY', isChecked: true },
        { name: 'INDEX', isChecked: true },
    ])
}

type StockTypeContextType = {
    stockTypes: StockType[]
    setStockTypes: Dispatch<SetStateAction<StockType[]>>
}

const StockTypesContext = createContext<StockTypeContextType | null>(null)

interface StocksTableProvidersProps {
    children: ReactNode
}

export function StockTableProviders(props: StocksTableProvidersProps) {
    const [stockTypes, setStockTypes] = useStockTypesState()

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
