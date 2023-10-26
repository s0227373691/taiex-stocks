const fetchConstant = () =>
    fetch(`http://127.0.0.1:8555/constant/`)
        .then(res => res.json())

export default fetchConstant