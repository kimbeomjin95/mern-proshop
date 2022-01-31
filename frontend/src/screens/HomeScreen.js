import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  /* 상품 목록 조회 call */
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');

      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <Fragment>
      <h1>Latest Products</h1>
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
    </Fragment>
  );
};

export default HomeScreen;
