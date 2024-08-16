import Link from 'next/link'
import { useState } from 'react'

export default function ({ data: { data } }: { data: any }) {
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
