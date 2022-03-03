import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const params = useParams();
  const { keyword } = params;
  const pageNumber = params?.pageNumber || 1;

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
      {!keyword && <ProductCarousel />}
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
