'use client'

import { useTickers } from './ticker-data-access'

export function ButtonTickersSync() {
    const { mutate, isPending } = useTickers()
    return (
        <>
            <div className="p-4">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="items-start justify-between md:flex">
                        <div className="max-w-lg">
                            <h3 className="text-gray-300 text-xl font-bold sm:text-2xl">
                                Tickers
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                        <div onClick={() => mutate()}>
                            update {isPending && 'pending...'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
