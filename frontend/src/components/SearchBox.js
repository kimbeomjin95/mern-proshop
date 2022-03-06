import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            type="text"
            name="q"
            onChange={e => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요."
            className="mb-2"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="outline-success" className="mb-2">
            검색
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
