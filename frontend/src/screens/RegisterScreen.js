import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useNavigate } from 'react-router';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfimPassword] = useState('');
  const [message, setMessage] = useState('');

  const redirect = search ? search.split('=')[1] : '/';

  // 등록 callback
  useEffect(() => {
    // 등록 후 메인페이지 이동
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confimPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
    } else {
      // DISPATCH REGISTER
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>회원가입</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
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
          가입하기
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          회원이신 경우?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            로그인
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
