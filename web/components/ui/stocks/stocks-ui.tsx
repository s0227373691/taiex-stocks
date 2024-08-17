import StocksDropdownTypes from './stocks-dropdown-types'
import { useStockTable } from './stocks-data-access'

export function StocksSummary() {
    const { data } = useStockTable()
    return (
        <div className="mb-8">
            <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                All stocks
            </h3>
            <p className="text-sm text-gray-300">
                {data && `${data.length} tickers`}
            </p>
        </div>
    )
}

export function ConditionalFilter() {
    return (
        <div>
            <StocksDropdownTypes />
        </div>
    )
}
