import React, { useEffect, useMemo, useState } from 'react'

const MonthCompute = (props) => {
    const historicals = props.data
    const monthData = useMemo(() => {
        const month = new Array(12)
        historicals.map((el) => {
            const m = new Date(el.date).getMonth()
            if (month[m] === undefined) return month[m] = [el]
            month[m] = [...month[m], el]
        })
        // console.log(month)
        return month
    }, [props])
    return (
        <li>
            <span>{props.market} {props.symbol}</span>
            <ul>
                <li>{historicals[0].date} ~ {historicals[historicals.length - 1].date}</li>
                {monthData.map((el, i) => {
                    el.pop()
                    let upCount = 0;
                    let downCount = 0;
                    el.map(k => {
                        k.close > k.open ? upCount++ : downCount++
                    })
                    const allCount = upCount + downCount
                    const upProbability = ((upCount / allCount) * 100).toFixed(1);
                    return <li key={i}>
                        <span>{i + 1}月 - </span>
                        <span> | 上漲 {upCount} 次  </span>
                        <span> -- </span>
                        <span>  下跌 {downCount} 次 | </span>
                        <span>上漲機率 {upProbability} %</span>
                    </li>
                })}
            </ul>
        </li>
    )
}

export default MonthCompute