'use client'

import {
    useATH,
    useATHMaxDrawdown,
    useATHRatio,
    useCurrentPrice,
    useMA,
} from './product-data-access'
import React, { useMemo } from 'react'

export function ATH({ id, timeframe }: { id: string; timeframe: string }) {
    const ath = useATH({ id, timeframe })
    const athRatio = useATHRatio({ id, timeframe })
    return (
        <div>
            ath: {ath}, athRatio: {athRatio} {athRatio && '%'}{' '}
        </div>
    )
}

interface ATHRatioCardProps {
    id: string | string[]
    timeframe: string
}

export const ATHRatioCard: React.FC<ATHRatioCardProps> = ({
    id,
    timeframe,
}) => {
    const idString = Array.isArray(id) ? id.join(',') : id

    const athRatio = useATHRatio({ id: idString, timeframe })
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-gray-400 text-gray-700 border border-blue-gray-100 shadow-sm">
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
                {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p> */}
            </div>
        </div>
    )
}

interface ATHCardProps {
    id: string | string[]
    timeframe: string
}

export const ATHCard: React.FC<ATHCardProps> = ({ id, timeframe }) => {
    const idString = Array.isArray(id) ? id.join(',') : id

    const ath = useATH({ id: idString, timeframe })
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl  bg-gray-400 text-gray-700 border border-blue-gray-100 shadow-sm">
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
                {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p> */}
            </div>
        </div>
    )
}
interface MaxDrawdownCardProps {
    id: string | string[]
    timeframe: string
}

export const MaxDrawdownCard: React.FC<MaxDrawdownCardProps> = ({
    id,
    timeframe,
}) => {
    const idString = Array.isArray(id) ? id.join(',') : id
    const maxDrawdown = useATHMaxDrawdown({ id: idString, timeframe })

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-gray-400 text-gray-700 border border-blue-gray-100 shadow-sm">
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
                {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p> */}
            </div>
        </div>
    )
}

interface MaxDrawdownRatioCardProps {
    id: string | string[]
    timeframe: string
}

export const MaxDrawdownRatioCard: React.FC<MaxDrawdownRatioCardProps> = ({
    id,
    timeframe,
}) => {
    const idString = Array.isArray(id) ? id.join(',') : id
    const maxDrawdown = useATHMaxDrawdown({ id: idString, timeframe })
    const currentPrice = useCurrentPrice({ id: idString, timeframe })
    const ratio = useMemo(() => {
        if (currentPrice && maxDrawdown) {
            return ((currentPrice / maxDrawdown - 1) * 100).toFixed(2)
        }
    }, [maxDrawdown, currentPrice])

    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-gray-400 text-gray-700 border border-blue-gray-100 shadow-sm">
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
                    Distance to maxDrawdown price
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {ratio} %
                </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
                {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                </p> */}
            </div>
        </div>
    )
}

export function MovingAverages() {
    const { isLoading, indicatorTypes, indicatorTypeState, timeframes, data } =
        useMA()

    if (isLoading)
        return (
            <div className="w-[300px]">
                <LoadingMovingAverages />
            </div>
        )

    return (
        <div className="w-[300px] p-4 bg-gray-700 rounded text-white">
            <div className="flex justify-between mb-4">
                <form>
                    <label htmlFor="underline_select" className="sr-only">
                        Moving Averages
                    </label>
                    <select
                        id="underline_select"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        onChange={(e) => indicatorTypeState[1](e.target.value)}
                    >
                        {indicatorTypes.map((indicatorType) => (
                            <option
                                key={indicatorType.value}
                                value={indicatorType.value}
                            >
                                {indicatorType.name}
                            </option>
                        ))}
                    </select>
                </form>

                <div className="inline-flex rounded-md shadow-sm" role="group">
                    {timeframes.map((timeframe) => (
                        <button
                            key={timeframe}
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                            {timeframe}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {data?.map((ma: any) => (
                        <span
                            key={ma.period}
                            className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                        >
                            <span className="inline-block w-3/12">
                                {indicatorTypeState[0]}
                                {ma.period}
                            </span>
                            <span className="inline-block w-9/12">
                                {ma?.values && ma?.values[ma.values.length - 1]}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function LoadingMovingAverages() {
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
            {[null, null, null].map((el, i) => (
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
