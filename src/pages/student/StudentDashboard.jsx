

import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Button, Offcanvas, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import './Student_styles/studentDashboard.css';

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [purchasedCount, setPurchasedCount] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    loadPurchasedCount();
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const loadPurchasedCount = async () => {
    if (!user) return;
    try {
      const result = await window.storage.get(`purchased_courses_${user._id}`);
      if (result) {
        const purchased = JSON.parse(result.value);
        setPurchasedCount(purchased.length);
      }
    } catch (error) {
      setPurchasedCount(0);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowOffcanvas(false);
  };

  const SidebarContent = ({ onNavigate }) => (
    <div className="sidebar-content d-flex flex-column h-100">
      {/* User Profile Section */}
      <div className="user-profile-section text-center mb-4 pb-4 border-bottom">
        <div className="logo-section mb-3">
          <div className="logo-icon">📚</div>
          <h5 className="logo-text mb-0">Edunova</h5>
        </div>
        
        <div className="user-avatar mb-3">
          <div className="avatar-circle">
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="status-indicator"></div>
        </div>
        
        <h6 className="user-name mb-1">{user?user.username:"Guest"}</h6>
        <small className="user-email d-block text-truncate px-3">{user?user.email:"guest@gmail.com"}</small>
        
        {purchasedCount > 0 && (
          <Badge bg="success" className="mt-2">
            {purchasedCount} Course{purchasedCount > 1 ? 's' : ''} Enrolled
          </Badge>
        )}
      </div>

      {/* Navigation Menu */}
      <Nav className="flex-column nav-menu flex-grow-1">
        <Nav.Link
          as={NavLink}
          to="/student-dashboard/courses"
          className="nav-menu-item text-gray"
          onClick={onNavigate}
        >
          <i className="bi bi-book nav-icon"></i>
          <span>My Courses</span>
        </Nav.Link>
        
        <Nav.Link
          as={NavLink}
          to="/student-dashboard/results"
          className="nav-menu-item  text-gray"
          onClick={onNavigate}
        >
          <i className="bi bi-bar-chart nav-icon"></i>
          <span>My Results</span>
        </Nav.Link>
        
        <Nav.Link
          as={NavLink}
          to="/student-dashboard/purchase-history"
          className="nav-menu-item text-gray"
          onClick={onNavigate}
        >
          <i className="bi bi-clock-history nav-icon"></i>
          <span>Purchase History</span>
        </Nav.Link>
        
        <Nav.Link
          as={NavLink}
          to="/student-dashboard/profile"
          className="nav-menu-item  text-gray"
          onClick={onNavigate}
     
        >
          <i className="bi bi-person-gear nav-icon"></i>
          <span >Settings</span>
        </Nav.Link>
    

      {/* Logout Button */}
      <div className="sidebar-footer pt-3 border-top">
        <Button
          variant="outline-light"
          className="w-100 logout-btn"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </Button>
      </div>
        </Nav>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <span className="mobile-logo">📚</span>
            <span className="fw-bold">Edunova</span>
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            className="menu-toggle"
            onClick={() => setShowOffcanvas(true)}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
      )}

      <Container fluid className="p-0 dashboard-container">
        <Row className="g-0 min-vh-100">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Col md={3} lg={2} className="dashboard-sidebar">
              <SidebarContent />
            </Col>
          )}

          {/* Main Content Area */}
          <Col md={9} lg={10} className="main-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
        className="mobile-offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <span className="mobile-logo me-2">📚</span>
            Edunova
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <SidebarContent onNavigate={() => setShowOffcanvas(false)} />
        </Offcanvas.Body>
      </Offcanvas>

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

            {/* Explore Links */}
            <Col lg={2} md={6}>
              <h6 className="footer-heading">Explore</h6>
              <ul className="footer-links">
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/instructors">Instructors</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
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
              © 2025 Edunova. All rights reserved. Made with ❤️ for learners worldwide.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default StudentDashboard;