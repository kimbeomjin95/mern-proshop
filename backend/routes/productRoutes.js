import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

/*
 * @desc     상품목록 조회(전체)
 * @route    GET /api/products
 * @access   Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); // 전체검색
    res.json(products);
  }),
);

/*
 * @desc     상품 상세조회(id)
 * @route    GET /api/products/:id
 * @access   Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }),
);

export default router;
