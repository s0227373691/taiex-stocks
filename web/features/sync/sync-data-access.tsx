'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function useTasks() {
    const pathname = usePathname()
    return useState([
        {
            name: 'Ticker',
            description: 'update tickers',
            href: `${pathname}/ticker`,
        },
        {
            name: 'Historical',
            description: 'update historicals',
            href: `${pathname}/historical`,
        },
    ])
}
