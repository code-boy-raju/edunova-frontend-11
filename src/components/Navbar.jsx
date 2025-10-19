import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Navbar as BSNavbar,
  Nav,
  Container,
  Offcanvas,
  Button,
  NavDropdown,
  Badge
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <BSNavbar
      expand="lg"
      className="shadow-sm"
      sticky="top"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}
    >
      <Container fluid className="px-4">
        <BSNavbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center gap-2"
          style={{ color: '#14b8a6' }}
        >
          <span style={{ fontSize: '1.5rem' }}>📚</span>
          Edunova
        </BSNavbar.Brand>

        <BSNavbar.Toggle 
          aria-controls="navbar-nav" 
          style={{ borderColor: 'rgba(20, 184, 166, 0.5)' }}
        />

        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className="text-light px-3"
              style={({ isActive }) => isActive ? { color: '#14b8a6 !important' } : {}}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={NavLink} 
              to="/courses" 
              className="text-light px-3"
            >
              Courses
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link 
                  as={NavLink} 
                  to="/login" 
                  className="text-light px-3"
                >
                  Log In
                </Nav.Link>
                <NavDropdown
                  title={<span className="text-light">Sign Up</span>}
                  id="signup-dropdown"
                  className="px-3"
                >
                  <NavDropdown.Item as={NavLink} to="/student-signup">
                    👨‍🎓 As Student
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/instructor-signup">
                    👨‍🏫 As Instructor
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavDropdown
                title={
                  <span className="text-light d-flex align-items-center gap-2">
                    <span>👤</span>
                    <span>{user.username}</span>
                    <Badge bg="success" pill className="ms-1">
                      {user.role}
                    </Badge>
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item 
                  as={NavLink} 
                  to={user.role === 'student' ? '/student-dashboard' : '/instructor-dashboard'}
                >
                  📊 Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;