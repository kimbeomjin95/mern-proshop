import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/*
 * @desc     상품목록 조회(전체)
 * @route    GET /api/products
 * @access   Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // 전체검색
  res.json(products);
});

/*
 * @desc     상품 상세조회(id)
 * @route    GET /api/products/:id
 * @access   Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    // TODO id 변경 후 404 및 에러메시지 리턴을 안함(확인필요)
    res.status(404);
    throw new Error('Product not found');
  }
});

/*
 * @desc     상품 삭제(id)
 * @route    DELETE /api/products/:id
 * @access   Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    // 상품 삭제
    await product.remove();
    res.json({ message: '상품이 삭제되었습니다.' });
  } else {
    // TODO id 변경 후 404 및 에러메시지 리턴을 안함(확인필요)
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, deleteProduct };
