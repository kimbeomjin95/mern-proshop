/* 데이터를 가져오기 위해 실행할 수 있는 별도의 스크립트 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDb from './config/db.js';

// .env 파일안에 정보 get
dotenv.config();

// DB 연결
connectDb();

/* data insert */
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {}
  console.error(`${error}`.red.inverse);
  process.exit(1);
};

/* data delete */
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// 시작 시 실행 인자를 받으려면
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
