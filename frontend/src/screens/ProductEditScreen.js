import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetail } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ProductEditScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const productDetailReducer = useSelector(state => state.productDetailReducer);
  const { loading, product, error } = productDetailReducer;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  // 상품 상세조회 call
  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(listProductDetail(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, navigate, product, id]);

  const submitHandler = e => {
    e.preventDefault();

    // 정보수정 call
    // dispatch(
    //   // 최신 JS 문법(key: value가 동일한 이름일 경우 key값만 셋팅 가능)
    //   updateUser({
    //     _id: id,
    //     name,
    //     email,
    //     isAdmin,
    //   }),
    // );
  };

  return (
    <Fragment>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>상품 수정</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="name"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="number"
                placeholder="가격을 입력하세요."
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>상품 이미지</Form.Label>
              <Form.Control
                type="text"
                placeholder="상품 url을 입력하세요. "
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>브랜드</Form.Label>
              <Form.Control
                type="text"
                placeholder="브랜드를 입력하세요. "
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>재고</Form.Label>
              <Form.Control
                type="number"
                placeholder="재고를 입력하세요. "
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Control
                type="text"
                placeholder="카테고리를 입력하세요. "
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Control
                type="text"
                placeholder="설명를 입력하세요. "
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;
