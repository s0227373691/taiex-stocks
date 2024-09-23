import React from 'react'

interface StocksFeatureContainerProps {
    children: React.ReactNode
}

const StocksFeatureContainer = (props: StocksFeatureContainerProps) => {
    return (
        <div className="relative sm:rounded-lg w-[740px] m-auto mt-12">
            {props.children}
        </div>
    )
}

export default StocksFeatureContainer
