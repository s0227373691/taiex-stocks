export function delay(seconds) {
    return new Promise((resolve, reject) =>
        setTimeout(() => resolve(), seconds)
    )
}

export function calcEMAs(periods, values) {
    return values
        ? periods.map((period) => EMA.calculate({ period, values }))
        : null
}
