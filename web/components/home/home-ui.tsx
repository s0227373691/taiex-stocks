'use client'

import React, { useState } from 'react'
import { useTickers } from '../data-access'
import Link from 'next/link'

export function Stocks() {
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
            {isLoading ? (
                <LoadingStocks />
            ) : isError ? (
                <div className="text-white">Error</div>
            ) : (
                <TableStocks data={data} />
            )}
        </div>
    )
}

export function LoadingStocks() {
    const arrayEmpty = Array.from(new Array(5), () => null)
    return (
        <div
            role="status"
            className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 w-full"
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            {arrayEmpty.map((el, i) => (
                <div
                    key={`${el}` + i}
                    className="flex items-center justify-between pt-4"
                >
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
            ))}
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export function TableStocks({ data: { data } }: { data: any }) {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Ticker
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Symbol
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Market
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody className="h-auto">
                {data?.map((ticker: any) => (
                    <tr
                        key={ticker._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                    >
                        <td className="px-6 py-4">{ticker.name}</td>
                        <td className="px-6 py-4"> {ticker.symbol}</td>
                        <td className="px-6 py-4">{ticker.market}</td>
                        <td className="px-6 py-4">{ticker.type}</td>
                        <td className="px-6 py-4">
                            <ButtonStocksMore {...ticker} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export function ButtonStocksMore({ symbol }: { symbol: string }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button
                onClick={toggleDropdown}
                id={`dropdownMenuIconButton_${symbol}`}
                data-dropdown-toggle={`dropdownDots_${symbol}`}
                className="flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 4 15"
                >
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>
            {isOpen && (
                <div
                    id={`dropdownDots_${symbol}`}
                    className={`z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute`}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby={`dropdownMenuIconButton_${symbol}`}
                    >
                        <li>
                            <Link
                                href={`/product/${symbol}`}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <div className="py-2">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Separated link
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
