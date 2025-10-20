import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";

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
    <div className="p-3 d-flex flex-column h-100">
      <div className="text-center mb-4 pb-3 border-bottom border-secondary">
        <div className="dashboard-logo">👩‍🏫 Instructor Portal</div>
        <div style={{ fontSize: "3rem" }}>🧑‍🏫</div>
        <h6 className="text-white mb-1">{user?.username}</h6>
        <small className="text-white d-block text-truncate">
          {user?.email}
        </small>
      </div>

      <Nav className="flex-column">
        <Nav.Link
          as={NavLink}
          to="/instructor-dashboard/courses"
          className="text-light"
          onClick={onNavigate}
        >
          📚 My Courses
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/instructor-dashboard/create-course"
          className="text-light"
          onClick={onNavigate}
        >
          ➕ Add Course
        </Nav.Link>
        
      </Nav>

      <hr className="bg-light my-3" />

      <Button
        variant="outline-light"
        className="w-100"
        onClick={handleLogout}
      >
        🚪 Logout
      </Button>
    </div>
  );

  return (
    <Container fluid className="p-0">
      {/* ✅ Mobile header visible below 768px */}
      {isMobile && (
        <div className="mobile-header d-flex align-items-center justify-content-between px-3 py-2">
          <div className="fw-bold fs-5">🧑‍🏫 Edunova</div>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setShowOffcanvas(true)}
          >
            ☰
          </Button>
        </div>
      )}

      <Row className="g-0">
        {/* ✅ Sidebar visible only on md and larger */}
        {!isMobile && (
          <Col md={3} className="dashboard-sidebar p-0 desktop-sidebar">
            <SidebarContent />
          </Col>
        )}

        <Col className="p-4" md={{ span: 9 }}>
          <Outlet />
        </Col>
      </Row>

      {/* ✅ Offcanvas for mobile */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>🧑‍🏫 Edunova</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent onNavigate={() => setShowOffcanvas(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default InstructorDashboard;
