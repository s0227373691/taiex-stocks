import useMA from '../product-data-access/useMA'

export default function MovingAverages() {
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

function LoadingMovingAverages() {
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
