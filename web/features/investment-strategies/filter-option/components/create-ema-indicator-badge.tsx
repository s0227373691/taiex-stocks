'use client'

import React from 'react'
import indicatorService from '@/services/indicator'

const CreateEmaIndicatorBadge = () => {
    const handlerCreateEma = () => {
        const period = prompt('Input EMA period')
        indicatorService.createIndicators({
            type: 'ema',
            period: Number(period),
        })
    }
    return (
        <span
            className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-400"
            onClick={handlerCreateEma}
        >
            +
        </span>
    )
}

export default CreateEmaIndicatorBadge
