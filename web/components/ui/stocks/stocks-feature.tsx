import StocksFeatureContainer from './stocks-feature-container'
import StocksTable from './stocks-table'
import ConditionalFilter from './conditional-filter'
import StockTableProviders from './stock-table-providers'
import StocksSummary from './stocks-summary'
import tickerService from '@/services/ticker'

const StocksFeature = async () => {
    const res = await tickerService.get()
    return (
        <StockTableProviders searchKeyword="" initialTickers={res?.data}>
            <StocksFeatureContainer>
                <StocksSummary />
                <ConditionalFilter />
                <StocksTable />
            </StocksFeatureContainer>
        </StockTableProviders>
    )
}

export default StocksFeature
