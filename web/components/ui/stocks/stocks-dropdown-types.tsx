'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useStockTable } from './stocks-data-access'
import { StockType } from './stock-table-providers'

const StockDropdownTypes = () => {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenuButtonRef = useRef<HTMLDivElement>(null)
    useDocumentClick(toggleMenuButtonRef, setShowMenu)

    const handleShowMenu = () => setShowMenu((prev) => !prev)

    return (
        <div ref={toggleMenuButtonRef}>
            <ToggleMenuButton onClick={handleShowMenu} />
            {showMenu && <DropfownTypes />}
        </div>
    )
}

function useDocumentClick(
    ref: React.RefObject<HTMLDivElement>,
    setState: React.Dispatch<React.SetStateAction<boolean>>
) {
    const handleDocumentClick = (event: MouseEvent) => {
        const isClickInside = ref.current?.contains(event.target as Node)
        setState((prev) => (isClickInside ? prev : false))
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick)
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [])
}

export default StockDropdownTypes

function DropfownTypes() {
    const { stockTypes, setStockTypes } = useStockTable()
    const checkboxHandler = (selectedName: string) => {
        setStockTypes &&
            setStockTypes((prev) => {
                const newData = [...prev]
                for (let i = 0; i < prev.length; i++) {
                    const finded = newData[i].name === selectedName
                    if (finded) {
                        newData[i] = {
                            ...newData[i],
                            isChecked: !newData[i].isChecked,
                        }
                        break
                    }
                }
                return newData
            })
    }
    return (
        <div className="relative">
            <div
                id="dropdownBgHover"
                className="z-10 w-48 absolute top-2 bg-white rounded-lg shadow border border-gray-300 dark:bg-gray-700 dark:border-gray-900 "
            >
                <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownBgHoverButton"
                >
                    {stockTypes?.map((type) => (
                        <DropfownTypesItem
                            key={type.name}
                            {...type}
                            onChange={checkboxHandler}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

interface DropdownTypesItemProps extends StockType {
    onChange: (name: string) => void
}

function DropfownTypesItem(props: DropdownTypesItemProps) {
    const elementId = `checkbox-item-${props.name}`
    return (
        <li key={props.name}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                    id={elementId}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={props.isChecked}
                    onChange={() => props.onChange(props.name)}
                />
                <label
                    htmlFor={elementId}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                    {props.name}
                </label>
            </div>
        </li>
    )
}

interface ToggleMenuButton {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function ToggleMenuButton(props: ToggleMenuButton) {
    return (
        <button
            id="dropdownBgHoverButton"
            data-dropdown-toggle="dropdownBgHover"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-800 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            type="button"
            onClick={props.onClick}
        >
            Type
            <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                />
            </svg>
        </button>
    )
}
