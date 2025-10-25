import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Container } from 'react-bootstrap';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role) ) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You don't have permission to access this page.</p>
        </Alert>
      </Container>
    );
  }

  return children;
}

export default ProtectedRoute;