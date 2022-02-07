import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/*
 * @desc     주문 등록
 * @route    POST /api/orders
 * @access   Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('주문한 품목이 없습니다.');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

/*
 * @desc     주문번호 조회
 * @route    GET /api/orders/:id
 * @access   Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  // populate: 문서의 경로를 다른 컬렉션의 실제 문서로 자동으로 바꾸는 방법
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById };
