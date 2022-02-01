import express from 'express';
import dotenv from 'dotenv';
import _ from 'lodash';
import connectDb from './config/db.js'; // .js파일을 가져올 경우 .js 추가
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDb();

const app = express();

/* 메인페이지 조회 */
app.get('/', (req, res) => {
  res.send('API is running..');
});

app.use('/api/products', productRoutes);

// env 환경변수 get
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold,
  ),
);
