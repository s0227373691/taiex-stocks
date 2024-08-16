import { useState } from 'react'

interface DropdownTypesProps {
    name: string
    isChecked: boolean
}

const INIT_TYPES = [
    { name: 'EQUITY', isChecked: true },
    { name: 'INDEX', isChecked: true },
]

export default function DropdownTypes() {
    const [types, setTypes] = useState<DropdownTypesProps[]>(INIT_TYPES)
    return (
        <>
            <button
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
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

            <div
                id="dropdownBgHover"
                className="z-10 w-48 bg-white rounded-lg shadow dark:bg-gray-700"
            >
                <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownBgHoverButton"
                >
                    {types.map((type) => (
                        <li key={type.name}>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id="checkbox-item-4"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    checked={type.isChecked}
                                    onChange={() => {
                                        setTypes((prev) => {
                                            const newData = [...prev]
                                            for (
                                                let i = 0;
                                                i < prev.length;
                                                i++
                                            ) {
                                                const finded =
                                                    newData[i].name ===
                                                    type.name
                                                if (finded) {
                                                    newData[i] = {
                                                        ...newData[i],
                                                        isChecked:
                                                            !newData[i]
                                                                .isChecked,
                                                    }
                                                    break
                                                }
                                            }
                                            return newData
                                        })
                                    }}
                                />
                                <label
                                    htmlFor="checkbox-item-4"
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                    {type.name}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
