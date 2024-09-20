'use client'

import StocksFeatureContainer from './stocks-feature-container'
import StocksTable from './stocks-table'
import ConditionalFilter from './conditional-filter'
import StockTableProviders from './stock-table-providers'
import StocksSummary from './stocks-summary'

export default function StocksFeature() {
    return (
        <StockTableProviders>
            <StocksFeatureContainer>
                <StocksSummary />
                <ConditionalFilter />
                <StocksTable />
            </StocksFeatureContainer>
        </StockTableProviders>
    )
}
