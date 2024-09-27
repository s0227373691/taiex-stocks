import React from 'react'
import Sidebar from './components/sidebar'
import PageContent from './components/page-content'

const InvestmentStrategiesFeature = () => {
    return (
        <div className="flex relative h-full mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
            <Sidebar />
            <PageContent />
        </div>
    )
}

export default InvestmentStrategiesFeature
