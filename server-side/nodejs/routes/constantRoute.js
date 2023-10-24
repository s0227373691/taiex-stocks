const router = require('express').Router()

router.get('/', (req, res) => {
    const constant = {
        exchange: [
            { name: '臺灣證券交易所', value: 'TWSE' },
            { name: '證券櫃檯買賣中心', value: 'TPEx' }
        ],
        market: [
            { name: '上市', value: 'TSE' },
            { name: '上櫃', value: 'OTC' },
            { name: '興櫃一般板', value: 'ESB' },
            { name: '臺灣創新板', value: 'TIB' },
            { name: '興櫃戰略新板', value: 'PSB' },
        ],
        type: [
            { name: '股票', value: 'EQUITY' },
            { name: '指數', value: 'INDEX' },
            { name: '權證', value: 'WARRANT' },
            { name: '盤中零股', value: 'ODDLOT' },

        ],
        industry: [
            { name: '公司債、附認股權公司債、認購(售)權證', code: '00' },
            { name: '水泥工業', code: '01' },
            { name: '食品工業', code: '02' },
            { name: '塑膠工業', code: '03' },
            { name: '紡織纖維', code: '04' },
            { name: '電機機械', code: '05' },
            { name: '電器電纜', code: '06' },
            { name: '玻璃陶瓷', code: '08' },
            { name: '造紙工業', code: '09' },
            { name: '鋼鐵工業', code: '10' },
            { name: '橡膠工業', code: '11' },
            { name: '汽車工業', code: '12' },
            { name: '建材營造', code: '14' },
            { name: '航運業', code: '15' },
            { name: '觀光餐旅', code: '16' },
            { name: '金融保險', code: '17' },
            { name: '貿易百貨', code: '18' },
            { name: '綜合', code: '19' },
            { name: '其他', code: '20' },
            { name: '化學工業', code: '21' },
            { name: '生技醫療業', code: '22' },
            { name: '油電燃氣業', code: '23' },
            { name: '半導體業', code: '24' },
            { name: '電腦及週邊設備業', code: '25' },
            { name: '光電業', code: '26' },
            { name: '通信網路業', code: '27' },
            { name: '電子零組件業', code: '28' },
            { name: '電子通路業', code: '29' },
            { name: '資訊服務業', code: '30' },
            { name: '其他電子業', code: '31' },
            { name: '文化創意業', code: '32' },
            { name: '農業科技業', code: '33' },
            { name: '電子商務', code: '34' },
            { name: '綠能環保', code: '35' },
            { name: '數位雲端', code: '36' },
            { name: '運動休閒', code: '37' },
            { name: '	居家生活', code: '38' },
            { name: '管理股票', code: '80' },
        ]

    }
    res.json({ status: 200, data: constant })
})

module.exports = router

