import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetail, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useNavigate } from 'react-router';
import Table from 'react-bootstrap/Table';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetail = useSelector(state => state.userDetail);
  const { loading, user, error } = userDetail;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfimPassword] = useState('');
  const [message, setMessage] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector(state => state.orderMyList);
  const { loading: loadingOrders, orders, error: errorOrders } = orderMyList;

  // 프로필 상세 call
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetail('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confimPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
    } else {
      // DISPATCH 프로필 수정
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>회원정보</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">회원정보가 수정되었습니다.</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="name"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confimPassword" className="mb-3">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 확인을 입력하세요."
              value={confimPassword}
              onChange={e => setConfimPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            수정
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.paidAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
