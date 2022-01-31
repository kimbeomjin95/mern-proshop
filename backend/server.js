const express  = require('express');
const products = require('./data/products')
const _ = require('lodash')

const app = express()
const port = 5000

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

app.listen(port, console.log('Server running on port 5000'))