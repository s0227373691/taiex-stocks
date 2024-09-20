'use client'

import StocksTable from './stocks-table'
import { ConditionalFilter, StocksSummary } from './stocks-ui'
import StockTableProviders from './stock-table-providers'

export default function StocksFeature() {
    return (
        <StockTableProviders>
            <div className="relative shadow-md sm:rounded-lg w-[740px] m-auto mt-12">
                <StocksSummary />
                <ConditionalFilter />
                <StocksTable />
            </div>
        </StockTableProviders>
    )
}
