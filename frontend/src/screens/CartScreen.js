import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { useLocation, useParams } from 'react-router';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const qty = search ? Number(search.split('=')[1]) : 1;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return <div>Cart</div>;
};

export default CartScreen;
