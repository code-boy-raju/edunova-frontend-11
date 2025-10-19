import React from 'react';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MessageBox() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5 text-center">
              {/* Success Icon */}
              <div 
                className="mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  fontSize: '3rem'
                }}
              >
                ✓
              </div>

              {/* Title */}
              <h2 className="mb-3 fw-bold">Application Submitted!</h2>
              
              {/* Message */}
              <p className="text-muted mb-4">
                Your instructor application has been submitted successfully. 
                Our admin team will review your credentials and documentation.
              </p>

              {/* Info Alert */}
              <Alert variant="info" className="text-start">
                <Alert.Heading as="h6">📧 What happens next?</Alert.Heading>
                <ul className="mb-0 small">
                  <li>Admin reviews your submitted documents</li>
                  <li>You'll receive an email notification (usually within 24-48 hours)</li>
                  <li>Once approved, you can login and start creating courses</li>
                  <li>If rejected, you may reapply with updated documents</li>
                </ul>
              </Alert>

              {/* Additional Info */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body className="p-3">
                  <h6 className="mb-3">📋 Review Process</h6>
                  <Row className="text-center">
                    <Col xs={4}>
                      <div style={{ fontSize: '2rem' }}>📄</div>
                      <small className="d-block text-muted">Document<br/>Verification</small>
                    </Col>
                    <Col xs={4}>
                      <div style={{ fontSize: '2rem' }}>✅</div>
                      <small className="d-block text-muted">Admin<br/>Approval</small>
                    </Col>
                    <Col xs={4}>
                      <div style={{ fontSize: '2rem' }}>🎓</div>
                      <small className="d-block text-muted">Start<br/>Teaching</small>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-2">
                <Button 
                  variant="success"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Go to Home
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </div>

              {/* Help Text */}
              <p className="text-muted mt-4 mb-0 small">
                Questions? Contact us at{' '}
                <a href="rraj1572527@gmail.com" className="text-decoration-none">
                  support@edunova.com
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MessageBox;