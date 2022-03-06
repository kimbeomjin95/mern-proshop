import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col />
          <Col md="auto">
            <p className="text-muted">
              ㈜ 에이치피물류 | 대표 : 이상열 | 사업자 등록 번호 : 655-88-00171
              | 도매 및 소매업
            </p>
          </Col>{' '}
          <Col />
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <p className="text-muted">
              주소 : 경기도 군포시 흥안대로 24-3(금정동) 101호 | E-mail :
              rcn870107@naver.com
            </p>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <p className="text-muted">
              대표전화번호 : 1588-2696 | Fax : 031-476-7525
            </p>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col md="auto">
            <p className="text-muted">
              하이플러스유통 &copy; All rights reserved.
            </p>
          </Col>
          <Col />
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
