export function delay(seconds) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), seconds))
}
