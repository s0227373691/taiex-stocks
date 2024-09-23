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
    const { tickers, searchKeyword } = useStockTableContext()
    const stockTypesContext = useStockTableContext()
    const { stockTypes } = stockTypesContext
    const computeData = useMemo(() => {
        let data = [...tickers]

        // filter stock types
        const isEveryStockTypesChecked = stockTypes.every((el) => el.isChecked)
        if (!isEveryStockTypesChecked) {
            const checkedStockTypes = stockTypes
                .filter((el) => el.isChecked)
                .map((el) => el.name)

            data = data.filter((el: any) => checkedStockTypes.includes(el.type))
        }

        // filter search keyword
        if (searchKeyword !== '') {
            data = data.filter((el) => {
                const str = el.name + el.symbol
                let strIdx = 0
                for (const searchKeywordChar of searchKeyword) {
                    let found = false
                    for (let j = strIdx; j < str.length; j++) {
                        const strChar = str[j]
                        if (searchKeywordChar === strChar) {
                            strIdx = j + 1
                            found = true
                            break
                        }
                    }
                    if (!found) return false
                }
                return true
            })
        }

        return data
    }, [tickers, stockTypes, searchKeyword])

    return { data: computeData, ...stockTypesContext }
}
