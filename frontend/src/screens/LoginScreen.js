import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useNavigate } from 'react-router';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const userLogin = useSelector(state => state.userLogin);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = search ? search.split('=')[1] : '/';
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    // 로그인 했을 경우
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const submitHandler = e => {
    e.preventDefault();

    // DISPATCH LOGIN
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>로그인</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={e => setEmail(e.target.value)}
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

        <Button type="submit" variant="primary">
          로그인
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          아직 회원이 아니신가요?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            회원가입
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
