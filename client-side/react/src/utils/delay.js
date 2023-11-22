const delay = (seconds) => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), seconds))
}

export default delay