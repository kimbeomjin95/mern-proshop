import React, { Fragment, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { useLocation, useNavigate, useParams } from 'react-router';
import { addToCart, removeFromCart } from '../actions/cartActions';
import _ from 'lodash';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const qty = search ? Number(search.split('=')[1]) : 1;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  /* 상품 삭제 */
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  /* 상품 주문 */
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping'); // 로그인 하지 않으면 로그인할 예정
  };

  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        size="sm"
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {_.reduce(
                    cartItems,
                    function (acc, item) {
                      return acc + item.qty;
                    },
                    0,
                  )}
                  ) items
                </h2>
                $
                {_.reduce(
                  cartItems,
                  function (memo, item) {
                    return memo + item.qty * item.price;
                  },
                  0,
                ).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CartScreen;
