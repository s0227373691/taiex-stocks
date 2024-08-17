import { useTickers } from '@/components/data-access'
import StocksDropdownTypes from './stocks-dropdown-types'

export function StocksSummary() {
    const { isSuccess, data } = useTickers()
    return (
        <div className="mb-8">
            <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                All stocks
            </h3>
            <p className="text-sm text-gray-300">
                {isSuccess && `${data.data.length} tickers`}
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
