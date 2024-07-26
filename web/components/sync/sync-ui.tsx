'use client'

import { useEffect, useMemo, useState } from 'react'
import { useHistoricalCount, useSnapshot, useTaixe } from './sync-data-access'
import { syncFullHistorical } from '@/config/finance'
import { delay } from '@/utils'

export function BreadCrumb() {
    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <a
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3 me-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg
                            className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <a
                            href="#"
                            className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                        >
                            Sync
                        </a>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export function SymbolList() {
    const { stocks, syncFullTimeframe } = useTaixe()

    return (
        <div className="p-4">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-300 text-xl font-bold sm:text-2xl">
                            All products
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div>
                        <Modal
                            stocks={stocks}
                            syncFullTimeframe={syncFullTimeframe}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Modal({ stocks, syncFullTimeframe }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm p-1 text-center me-2 mb-2"
                onClick={toggleModal}
            >
                <svg
                    className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1"
                        d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
                    />
                </svg>
            </button>
            <div
                id="select-modal"
                tabIndex={-1}
                className={`${
                    !isOpen && 'hidden'
                } overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-4xl max-h-full m-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Open positions
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="select-modal"
                                onClick={toggleModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <TaiexTable
                                stocks={stocks}
                                syncFullTimeframe={syncFullTimeframe}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function TaiexTable({
    stocks,
    syncFullTimeframe,
}: {
    stocks: any
    syncFullTimeframe: any
}) {
    const [rows, setRows] = useState(15)
    const [page, setPage] = useState(0)
    const [pageStocks, setPageStocks] = useState([])

    useEffect(() => {
        if (stocks) {
            const _pageStocks = []
            for (let i = 0; i < rows; i++) {
                const index = rows * page + i
                _pageStocks.push(stocks[index])
            }
            setPageStocks(_pageStocks)
        }
    }, [stocks, page])
    if (!stocks) return null

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setPage((prev) => --prev)}
                        >
                            Previous
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            1
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setPage((prev) => ++prev)}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-300 font-medium border-b">
                    <tr>
                        <th className="py-3 pr-6">symbol</th>
                        <th className="py-3 pr-6">name</th>
                        <th className="py-3 pr-6">status</th>
                        <th className="py-3 pr-6">Month count</th>
                        <th className="py-3 pr-6">Week count</th>
                        <th className="py-3 pr-6">Day count</th>
                        <th className="py-3 pr-6">
                            <SyncTaiexButton
                                stocks={stocks}
                                syncFullTimeframe={syncFullTimeframe}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-300 divide-y">
                    {pageStocks.map((el: any) => (
                        <TaiexTableRow
                            key={el._id}
                            syncFullTimeframe={() =>
                                syncFullTimeframe(el.symbol)
                            }
                            {...el}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export function TaiexTableRow(props: any) {
    const { data } = useHistoricalCount(props?.symbol)

    const syncHandler = async () => {
        await props.syncFullTimeframe()
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
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count?.M}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count?.W}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{data?.count?.D}</td>
            <td className="text-right whitespace-nowrap">
                <button
                    className="py-1.5 px-3 text-gray-300 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
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
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                onClick={() => {
                    const symbol = prompt('Input symbol')
                    const stockObj = stocks.find(
                        (stock) => stock.symbol === symbol
                    )
                    const _index = stocks.indexOf(stockObj)
                    const sync = async (index: number) => {
                        await syncFullTimeframe(stocks[index].symbol)
                        setIndex((prev) => ++prev)
                        sync(++index)
                    }
                    sync(_index)
                }}
            >
                full historical
            </button>
            <div>
                {index} / {stocks.length - 1}
            </div>

            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{
                        width: `${((index / (stocks.length - 1)) * 100).toFixed(
                            2
                        )}`,
                    }}
                >
                    {`${((index / (stocks.length - 1)) * 100).toFixed(2)}`}
                </div>
            </div>
        </>
    )
}
