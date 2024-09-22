import Link from 'next/link'

interface ButtonStocksMoreProps {
    symbol: string
    clickedSymbol: string
    setclickedSymbol: React.Dispatch<React.SetStateAction<string>>
}

const ButtonStocksMore = (props: ButtonStocksMoreProps) => {
    const isOpen = props.symbol === props.clickedSymbol
    const toggleDropdown = () => {
        if (props.clickedSymbol === '')
            return props.setclickedSymbol(props.symbol)

        if (isOpen) return props.setclickedSymbol('')
        else return props.setclickedSymbol(props.symbol)
    }

    return (
        <>
            <button
                onClick={toggleDropdown}
                id={`dropdownMenuIconButton_${props.symbol}`}
                data-dropdown-toggle={`dropdownDots_${props.symbol}`}
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
                    id={`dropdownDots_${props.symbol}`}
                    className={`z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute`}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby={`dropdownMenuIconButton_${props.symbol}`}
                    >
                        <li>
                            <Link
                                href={`/product/${props.symbol}`}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default ButtonStocksMore
