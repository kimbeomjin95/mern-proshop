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

/*
 * @desc     주문결제여부 수정
 * @route    GET /api/orders/:id/pay
 * @access   Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    // paypal api 연결
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // DB 저장
    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/*
 * @desc     로그인된 사용자의 주문정보 조회
 * @route    GET /api/orders/myorders
 * @access   Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/*
 * @desc     주문목록 전체 조회(관리자)
 * @route    GET /api/orders
 * @access   Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

/*
 * @desc     배송여부 수정
 * @route    GET /api/orders/:id/deliver
 * @access   Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // DB 저장
    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
