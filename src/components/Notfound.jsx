import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 text-center">
      <Row>
        <Col>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-3 fw-semibold">Page Not Found</h2>
          <p className="text-muted mb-4">
            Oops! The page you're looking for doesn’t exist or may have been moved.
          </p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
