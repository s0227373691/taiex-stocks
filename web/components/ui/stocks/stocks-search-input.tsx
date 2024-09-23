'use client'

import React, { Dispatch, useRef } from 'react'
import { useStockTableContext } from './stocks-data-access'

const StocksSearchInput = () => {
    return (
        <form className="max-w-md">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <SearchInput />
            </div>
        </form>
    )
}

export default StocksSearchInput

function SearchInput() {
    const handleChange = useDebounceSearchInput()
    return (
        <input
            type="search"
            id="default-search"
            className="block w-full px-5 py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Symbol"
            onChange={handleChange}
            required
        />
    )
}

function useDebounceSearchInput() {
    const debounceRef = useRef<NodeJS.Timeout | null>(null)
    const { setSearchKeyword } = useStockTableContext()
    const handleDebounce = (val: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => setSearchKeyword(val), 300)
    }

    return (event: React.ChangeEvent<HTMLInputElement>) =>
        handleDebounce(event.target.value)
}
