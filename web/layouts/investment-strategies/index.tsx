import React from 'react'
import Sidebar from './components/sidebar'
interface InvestmentStrategiesLayoutProps {
    children: React.ReactNode
}
const InvestmentStrategiesLayout = (props: InvestmentStrategiesLayoutProps) => {
    return (
        <div className="flex relative h-full mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
            <Sidebar />
            {props.children}
        </div>
    )
}

export default InvestmentStrategiesLayout
