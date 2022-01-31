import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js' // 파일을 가져올 경우 .js 추가
import _ from 'lodash'

dotenv.config()

const app = express()

/* 메인페이지 조회 */
app.get('/', (req, res) => {
	res.send('API is running..')
})

/* 상품목록 조회 */
app.get('/api/products', (req, res) => {
	res.json(products)
})

/* 상품 상세조회 */
app.get('/api/products/:id', (req, res) => {
	const id = req.params.id;
	const product = _.find(products, p => p._id === id)
	res.json(product)
})

// env 환경변수 get
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))