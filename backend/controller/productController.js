import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/*
 * @desc     상품목록 조회(전체)
 * @route    GET /api/products
 * @access   Public
 */
const getProducts = asyncHandler(async (req, res) => {
  // query: 쿼리스트링
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // 대소문자 구별X
        },
      }
    : {};

  const products = await Product.find({ ...keyword }); // 전체검색
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

/*
 * @desc     상품 등록(id)
 * @route    POST /api/products
 * @access   Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
 * @desc     상품 수정(id)
 * @route    PUT /api/products/:id
 * @access   Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error('상품을 찾을 수 없습니다.');
  }

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

/*
 * @desc     리뷰 등록
 * @route    POST /api/products/:id/reviews
 * @access   Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(r => {
      console.log('r', r);
      return r.user.toString() === req.user._id.toString();
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('상품에 이미 리뷰가 존재합니다.');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save(); // DB 저장
    res.status(201).json({ message: '리뷰가 추가되었습니다.' });
  } else {
    res.status(404);
    throw new Error('상품을 찾을 수 없습니다.');
  }

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
