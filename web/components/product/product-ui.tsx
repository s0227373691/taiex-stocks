'use client'

import Link from 'next/link'
import {
    useATH,
    useATHMaxDrawdown,
    useATHRatio,
    useAllHistorical,
    useCurrentPrice,
    useProductInfo,
    useSnapshot,
} from './product-data-access'
import { useMemo } from 'react'

export function AllHistorical({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const { isLoading, data } = useAllHistorical({ id, timeframe })

    if (isLoading) return <>Loading...</>

    console.log('AllHistorical', data)
    return (
        <div>
            AllHistorical
            {/* {data.map(el => <div>{el.type} {el.symbol}</div>)} */}
        </div>
    )
}

export function ATH({ id, timeframe }: { id: string; timeframe: string }) {
    const ath = useATH({ id, timeframe })
    const athRatio = useATHRatio({ id, timeframe })
    return (
        <div>
            ath: {ath}, athRatio: {athRatio} {athRatio && '%'}{' '}
        </div>
    )
}

export function MaxDrawdown({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const maxDrawdown = useATHMaxDrawdown({ id, timeframe })
    return <div>MaxDrawdown: {maxDrawdown}</div>
}

export function SymbolList() {
    const { isLoading, data } = useSnapshot()

    if (isLoading) return null

    return (
        <>
            <div className="w-1 hover:w-auto fixed top-0 right-0 h-screen hover:p-4">
                <ul className="h-full overflow-y-scroll py-4 rounded-lg bg-gray-600 flex flex-col">
                    {data.map((el) => (
                        <li
                            key={el.symbol}
                            className="hover:bg-gray-500 px-4 py-2"
                        >
                            <Link href={`/product/${el.symbol}`}>
                                <div className="w-12">{el.symbol}</div>
                                <span>{el.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export function Title({ id }: { id: string }) {
    const productInfo = useProductInfo(id)

    return (
        <div className="p-4 text-2xl">
            {productInfo?.symbol} {productInfo?.name}
        </div>
    )
}

export function ATHRatioCard({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const athRatio = useATHRatio({ id, timeframe })

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
            <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    ATH Ratio
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {athRatio}%
                </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p>
            </div>
        </div>
    )
}

export function ATHCard({ id, timeframe }: { id: string; timeframe: string }) {
    const ath = useATH({ id, timeframe })

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
            <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    ATH Price
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    ${ath}
                </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p>
            </div>
        </div>
    )
}

export function MaxDrawdownCard({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const maxDrawdown = useATHMaxDrawdown({ id, timeframe })

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
            <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Max Drawdown Price
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    ${maxDrawdown}
                </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p>
            </div>
        </div>
    )
}

export function MaxDrawdownRatioCard({
    id,
    timeframe,
}: {
    id: string
    timeframe: string
}) {
    const maxDrawdown = useATHMaxDrawdown({ id, timeframe })
    const currentPrice = useCurrentPrice({ id, timeframe })
    const ratio = useMemo(() => {
        if (currentPrice && maxDrawdown) {
            return ((currentPrice / maxDrawdown) * 100).toFixed(2)
        }
    }, [maxDrawdown, currentPrice])

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
            <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Max Drawdown Ratio
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {ratio} %
                </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p>
            </div>
        </div>
    )
}
