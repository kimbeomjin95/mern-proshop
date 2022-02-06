import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>로그인</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>로그인</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>배송</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>배송</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>결제</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>결제</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>주문진행</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>주문진행</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
