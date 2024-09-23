'use client'

import { useEffect, useRef, useState } from 'react'
import { useStockTable } from './stocks-data-access'
import ButtonStocksMore from './button-stocks-more'

const StocksTableBodyView = () => {
    const { data } = useStockTable()
    const [clickedSymbol, setclickedSymbol] = useState<string>('')
    const tableBodyRef = useRef<HTMLTableSectionElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        const isClickInside = tableBodyRef.current?.contains(
            event.target as Node
        )
        if (!isClickInside) return setclickedSymbol('')
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    return (
        <tbody className="h-auto" ref={tableBodyRef}>
            {data.map((ticker: any) => (
                <tr
                    key={ticker._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                >
                    <td className="px-6 py-4">{ticker.name}</td>
                    <td className="px-6 py-4"> {ticker.symbol}</td>
                    <td className="px-6 py-4">{ticker.type}</td>
                    <td className="px-6 py-4">
                        <ButtonStocksMore
                            {...ticker}
                            clickedSymbol={clickedSymbol}
                            setclickedSymbol={setclickedSymbol}
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default StocksTableBodyView
