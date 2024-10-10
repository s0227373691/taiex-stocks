import React from 'react'
import Layout from '@/layouts/investment-strategies'

interface InvestmentStrategiesLayoutProps {
    children: React.ReactNode
}

const InvestmentStrategiesLayout = (props: InvestmentStrategiesLayoutProps) => {
    return <Layout>{props.children}</Layout>
}

export default InvestmentStrategiesLayout
