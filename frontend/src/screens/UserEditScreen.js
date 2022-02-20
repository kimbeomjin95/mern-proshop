import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetail } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const UserEditScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const userDetail = useSelector(state => state.userDetail);
  const { loading, user, error } = userDetail;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const redirect = search ? search.split('=')[1] : '/';

  // 상세조회 call
  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetail(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, id]);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>회원정보 수정</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isAdmin" className="mb-3">
              <Form.Label>관리자 권한여부</Form.Label>
              <Form.Check
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              수정
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;
