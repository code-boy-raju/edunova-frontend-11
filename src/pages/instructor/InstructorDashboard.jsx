
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate,Link } from "react-router-dom";
import { Container, Row, Col, Nav, Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import "./instreuctor_styles/InstructorDashboard.css";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

function InstructorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowOffcanvas(false);
  };

  const SidebarContent = ({ onNavigate }) => (
    <div className="sidebar-content d-flex flex-column h-100">
      {/* Logo Section */}
      <div className="logo-section text-center">
        <div className="logo-icon">📚</div>
        <div className="logo-text">Edunova</div>
      </div>

      {/* User Profile Section */}
      <div className="user-profile-section text-center pb-4 mb-4 border-bottom">
        <div className="user-avatar mb-3">
          <div className="avatar-circle">
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="status-indicator"></div>
        </div>
        <h6 className="user-name mb-1">{user?.username || "Instructor"}</h6>
        <small className="user-email d-block text-truncate px-2">
          {user?.email || "instructor@edunova.com"}
        </small>
      </div>

     <Nav className="nav-menu flex-column flex-grow-1">

  {/* My Courses */}
  <Nav.Link
    as={NavLink}
    to="/instructor-dashboard/courses"
    className="nav-menu-item text-center text-gray"
    onClick={onNavigate}
  >
    <i className="bi bi-book nav-icon"></i>
    <span>My Courses</span>
  </Nav.Link>

  {/* Add Course */}
  <Nav.Link
    as={NavLink}
    to="/instructor-dashboard/create-course"
    className="nav-menu-item text-center text-gray"
    onClick={onNavigate}
  >
    <i className="bi bi-plus-circle nav-icon"></i>
    <span>Add Course</span>
  </Nav.Link>

  {/* ✅ Logout just after Add Course */}
  <div className="logout-inline my-2">
    <Button
      variant="outline-light"
      className="logout-btn w-100 d-flex justify-content-center align-items-center gap-2"
      onClick={handleLogout}
    >
      <i className="bi bi-box-arrow-right"></i>
      <span>Logout</span>
    </Button>
  </div>

</Nav>

    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <Container fluid className="dashboard-container p-0">
        {/* Mobile Header */}
        {isMobile && (
          <div className="mobile-header">
            <div className="mobile-logo">
              📚 Edunova
            </div>
            <Button
              variant="outline-dark"
              size="sm"
              className="menu-toggle"
              onClick={() => setShowOffcanvas(true)}
            >
              <i className="bi bi-list"></i>
            </Button>
          </div>
        )}

        <Row className="g-0">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Col md={3} lg={2} className="dashboard-sidebar">
              <SidebarContent onNavigate={() => {}} />
            </Col>
          )}

          {/* Main Content */}
          <Col className="main-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </Col>
        </Row>

        {/* Mobile Offcanvas */}
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="start"
          className="mobile-offcanvas"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>
              📚 Edunova
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <SidebarContent onNavigate={() => setShowOffcanvas(false)} />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>

       {/* Enhanced Footer */}
      <footer className="enhanced-footer">
        <Container>
          <Row className="gy-4 justify-content-between">
            {/* Brand Section */}
            <Col lg={3} md={6}>
              <div className="footer-brand mb-3">
                <span className="footer-logo">📚</span>
                <h5 className="fw-bold mb-2">Edunova</h5>
              </div>
              <p className="footer-description">
                Empowering learners worldwide with AI-driven education and innovative learning experiences.
              </p>
              <div className="social-links mt-3">
                <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" className="social-icon twitter" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon instagram" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon facebook" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </div>
            </Col>

        

            {/* Support Links */}
            <Col lg={2} md={6}>
              <h6 className="footer-heading">Support</h6>
              <ul className="footer-links">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
              </ul>
            </Col>

            {/* Legal Links */}
            <Col lg={2} md={6}>
              <h6 className="footer-heading">Legal</h6>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/guidelines">Guidelines</Link></li>
              </ul>
            </Col>

          </Row>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <p className="mb-0">
              © 2025 Edunova. All rights reserved. Made with for learners worldwide.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default InstructorDashboard;