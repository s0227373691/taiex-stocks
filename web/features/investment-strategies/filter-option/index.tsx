import React from 'react'
import {
    EmaIndicatorCard,
    SmaIndicatorCard,
    WmaIndicatorCard,
} from './components/indicator-cards'

const FilterOptionFeature = () => {
    return (
        <div>
            <EmaIndicatorCard />
            <SmaIndicatorCard />
            <WmaIndicatorCard />
        </div>
    )
}

export default FilterOptionFeature
