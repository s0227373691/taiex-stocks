'use client'

import { useEffect, useMemo, useState } from 'react'
import { useHistoricalCount, useSnapshot, useTaixe } from './sync-data-access'
import { syncFullHistorical } from '@/config/finance'
import { delay } from '@/utils'

export function SymbolList() {
    const { stocks, syncFullTimeframe } = useTaixe()

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
                    <div className="text-black">
                        <SyncTaiexButton
                            stocks={stocks}
                            syncFullTimeframe={syncFullTimeframe}
                        />
                    </div>
                </div>
                <div className="mt-12 relative h-max overflow-auto">
                    <TaiexTable
                        stocks={stocks}
                        syncFullTimeframe={syncFullTimeframe}
                    />
                </div>
            </div>
        </div>
    )
}

export function TaiexTable({
    stocks,
    syncFullTimeframe,
}: {
    stocks: any
    syncFullTimeframe: any
}) {
    if (!stocks) return null

    return (
        <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
                <tr>
                    <th className="py-3 pr-6">symbol</th>
                    <th className="py-3 pr-6">name</th>
                    <th className="py-3 pr-6">status</th>
                    <th className="py-3 pr-6">Purchase</th>
                    <th className="py-3 pr-6">price</th>
                    <th className="py-3 pr-6">sync</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
                {stocks.map((el: any) => (
                    <TaiexTableRow
                        key={el._id}
                        syncFullTimeframe={() => syncFullTimeframe(el.symbol)}
                        {...el}
                    />
                ))}
            </tbody>
        </table>
    )
}

export function TaiexTableRow(props: any) {
    const { data, refetch } = useHistoricalCount(props?.symbol)

    useEffect(() => {
        refetch()
    }, [props?.isActive])

    const syncHandler = async () => {
        await props.syncFullTimeframe()
        refetch()
    }

    return (
        <tr>
            <td className="pr-6 py-4 whitespace-nowrap">{props?.symbol}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{props?.name}</td>
            <td className="pr-6 py-4 whitespace-nowrap">
                <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        props?.isActive
                            ? 'text-red-600 bg-red-50'
                            : 'text-green-600 bg-green-50'
                    }`}
                >
                    {props?.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count.M}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count.W}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count.D}</td>
            <td className="text-right whitespace-nowrap">
                <button
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                    onClick={syncHandler}
                >
                    Sync
                </button>
            </td>
        </tr>
    )
}

export function SyncTaiexButton({
    stocks,
    syncFullTimeframe,
}: {
    stocks: string
    syncFullTimeframe: any
}) {
    const [index, setIndex] = useState(0)
    if (!stocks) return null

    return (
        <>
            <button
                onClick={() => {
                    const sync = async (index: number) => {
                        await syncFullTimeframe(stocks[index].symbol)
                        setIndex((prev) => ++prev)
                        sync(++index)
                    }
                    sync(index)
                }}
            >
                full historical
            </button>
            <div>
                {index} / {stocks.length - 1}
            </div>
        </>
    )
}
