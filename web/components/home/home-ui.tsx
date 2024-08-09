'use client'

import React from 'react'
import { useTickers } from '../data-access'
import { useRouter } from 'next/navigation'

export function Tickers() {
    const { isLoading, isError, data } = useTickers()

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[740px] m-auto mt-12">
            {isLoading ? (
                <LoadingTickers />
            ) : isError ? (
                <div className="text-white">Error</div>
            ) : (
                <TableTickers data={data} />
            )}
        </div>
    )
}

export function LoadingTickers() {
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
            {[null, null, null, null, null].map((el, i) => (
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

export function TableTickers({ data: { data } }: { data: any }) {
    const router = useRouter()

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Market
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Symbol
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody className="overflow-y-scroll h-auto">
                {data?.map((el: any) => (
                    <tr
                        key={el._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => router.push(`/product/${el.symbol}`)}
                    >
                        <td className="px-6 py-4">{el.market}</td>
                        <td className="px-6 py-4">{el.type}</td>
                        <td className="px-6 py-4"> {el.symbol}</td>
                        <td className="px-6 py-4">{el.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
