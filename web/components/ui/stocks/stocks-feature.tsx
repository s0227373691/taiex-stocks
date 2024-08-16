'use client'

import { useTickers } from '@/components/data-access'
import StocksLoading from './stocks-loading'
import StocksDropdownTypes from './stocks-dropdown-types'
import StocksTable from './stocks-table'

export default function () {
    const { isLoading, isError, isSuccess, data } = useTickers()
    return (
        <div className="relative shadow-md sm:rounded-lg w-[740px] m-auto mt-12">
            <div className="mb-8">
                <h3 className="text-3xl font-semibold text-gray-300 mb-2">
                    All stocks
                </h3>
                <p className="text-sm text-gray-300">
                    {isSuccess && `${data.data.length} tickers`}
                </p>
            </div>
            <div>
                <StocksDropdownTypes />
            </div>
            {isLoading ? (
                <StocksLoading />
            ) : isError ? (
                <div className="text-white">Error</div>
            ) : (
                <StocksTable data={data} />
            )}
        </div>
    )
}
