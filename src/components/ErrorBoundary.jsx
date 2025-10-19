import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Oops! Something went wrong</Alert.Heading>
            <p>We're sorry, but something unexpected happened.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline-danger"
              >
                Go to Homepage
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;