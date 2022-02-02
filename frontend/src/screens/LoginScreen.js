import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useNavigate } from 'react-router';
import { load } from 'dotenv';

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
    // if (userInfo) {
    //   navigate(redirect);
    // }
  }, [redirect, userInfo, navigate]);
  // const dispatch = useDispatch();
  // const qty = search ? Number(search.split('=')[1]) : 1;

  const submitHandler = () => {
    // e.preventDefault();
    //
    // // DISPATCH LOGIN
    // dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
