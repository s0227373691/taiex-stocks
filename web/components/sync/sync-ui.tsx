'use client'

import { useMemo } from 'react'
import { useSnapshot } from './sync-data-access'

export function SymbolList() {
    const { data } = useSnapshot()
    const stocks = useMemo(
        () => data?.filter((el: any) => el.symbol.length === 4),
        [data]
    )
    if (!stocks) return null
    console.log(stocks.length)
    return (
        <div className="p-4">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            All products
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
                <div className="mt-12 relative h-max overflow-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 pr-6">symbol</th>
                                <th className="py-3 pr-6">name</th>
                                <th className="py-3 pr-6">status</th>
                                <th className="py-3 pr-6">Purchase</th>
                                <th className="py-3 pr-6">price</th>
                                <th className="py-3 pr-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {stocks.map((el: any) => (
                                <tr key={el._id}>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {el.symbol}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {el.name}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                                el.status == 'Active'
                                                    ? 'text-green-600 bg-green-50'
                                                    : 'text-blue-600 bg-blue-50'
                                            }`}
                                        >
                                            {el.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {el.plan}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {el.price}
                                    </td>
                                    <td className="text-right whitespace-nowrap">
                                        <a className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Manage
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
