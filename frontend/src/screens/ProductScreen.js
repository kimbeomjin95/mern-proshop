import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetail,
  createProductReview,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetailReducer = useSelector(state => state.productDetailReducer);
  const { loading, product, error } = productDetailReducer;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let { id } = useParams();

  /* 상품 상세조회 call */
  useEffect(() => {
    if (successProductReview) {
      alert('리뷰가 등록되었습니다.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(listProductDetail(id));

    return () => {
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    };
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  // 리뷰 등록 call
  const submitHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {/* 왼쪽 IMG */}
            <Col md={6}>
              {/*<Image src={product.image} alt={product.name} fluid />*/}
              <Image
                src={process.env.PUBLIC_URL + `/${product.image}`}
                alt={product.name}
                fluid
              />
            </Col>
            {/* 가운데 상품정보 */}
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  >
                    {product.name}
                  </Rating>
                </ListGroup.Item>
                <ListGroup.Item>price: {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* 오른쪽 가격정보 */}
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* 재고가 있으면 콤보박스 렌더링 */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            size="sm"
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>상품리뷰</h2>
              {product.reviews.length === 0 && (
                <Message>현재 등록된 리뷰가 없습니다.</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>리뷰 작성</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>평점</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">선택</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        등록
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">로그인</Link> 후에 작성이 가능합니다
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductScreen;
