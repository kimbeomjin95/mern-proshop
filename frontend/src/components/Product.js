import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const style = {
  // height: 'auto',
  height: '216px',
  // maxHeight: '250px',
  // width: 'auto',
  // maxWidth: '250px',
};

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          style={style}
          src={process.env.PUBLIC_URL + `/${product.image}`}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            {' '}
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/*<Card.Text as="div">*/}
        {/*  <Rating*/}
        {/*    value={product.rating}*/}
        {/*    text={`${product.numReviews} reviews`}*/}
        {/*  />*/}
        {/*</Card.Text>*/}
        {/*<Card.Text as="h3">${product.price}</Card.Text>*/}
      </Card.Body>
    </Card>
  );
};

export default Product;
