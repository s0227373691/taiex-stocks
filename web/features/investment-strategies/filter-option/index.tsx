'use client'

import React from 'react'
import {
    EmaIndicatorCard,
    SmaIndicatorCard,
} from './components/indicator-cards'

const FilterOptionFeature = () => {
    return (
        <div>
            <EmaIndicatorCard />
            <SmaIndicatorCard />
        </div>
    )
}

export default FilterOptionFeature
