import path from 'path'; // path 모듈은 폴더와 파일의 경로를 지정해주는 모듈이다.
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js'; // .js파일을 가져올 경우 .js 추가
import morgan from 'morgan';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorhandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDb();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// JSON Request Body 파싱
app.use(express.json());

/* 메인페이지 조회 */
app.get('/', (req, res) => {
  res.send('API is running..');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

// __dirname 은 현재 실행 중인 폴더 경로
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use()는 미들웨어 기능을 마운트하거나 지정된 경로에 마운트하는 데 사용
app.use(notFound);
app.use(errorhandler);

// env 환경변수 get
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold,
  ),
);
