import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import { useNavigate, useParams } from 'react-router';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const params = useParams();
  const { keyword } = params;
  const pageNumber = params?.pageNumber || 1;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* store */
  const productList = useSelector(state => state.productListReducer);
  const { loading, error, products, pages, page } = productList;

  /* 상품 목록 조회 call */
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button variant="link" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      )}
      <h1>상품 소개</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {_.map(products, product => {
              // return 주의
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
