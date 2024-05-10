const delay = (seconds) => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), seconds))
}

module.exports = delay