import StocksDropdownTypes from './stocks-dropdown-types'
import StocksSearchInput from './stocks-search-input'

const ConditionalFilter = () => {
    return (
        <div className="flex justify-between mb-3">
            <StocksDropdownTypes />
            <StocksSearchInput />
        </div>
    )
}

export default ConditionalFilter
