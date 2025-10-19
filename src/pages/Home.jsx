
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   Navbar,
//   Nav,
//   Container,
//   Offcanvas,
//   Button,
//   Alert,
//   NavDropdown
// } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/actions/authActions"; // 👈 your logout action
// function LandingPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ Get user state from Redux
//   const { user } = useSelector((state) => state.auth);

  

//   // ✅ Logout Handler
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   // Check if the user is logged in but not verified
//   const isEmailNotVerified = user && !user.emailVerified;

//   return (
//     <>
//       <Navbar
//         expand="md"
//         bg="dark"
//         variant="dark"
//         className="mb-3 py-2 shadow-sm"
//         sticky="top"
//       >
//         <Container fluid>
//           {/* Brand */}
//           <Navbar.Brand
//             as={NavLink}
//             to="/"
//             className="fw-bold fs-4 text-success"
//           >
//       Edunova
//           </Navbar.Brand>

//           {/* Mobile Toggle */}
//           <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />

//           {/* Offcanvas Menu for Mobile */}
//           <Navbar.Offcanvas
//             id="offcanvasNavbar-expand-md"
//             aria-labelledby="offcanvasNavbarLabel-expand-md"
//             placement="end"
//             className="bg-dark text-white"
//           >
//             <Offcanvas.Header closeButton closeVariant="white">
//               <Offcanvas.Title
//                 id="offcanvasNavbarLabel-expand-md"
//                 className="fw-semibold text-success"
//               >
//               Menu
//               </Offcanvas.Title>
//             </Offcanvas.Header>

//             <Offcanvas.Body>
//               {/* Navigation Links */}
//               <Nav className="justify-content-start flex-grow-1 pe-3 gap-3">
//                 <Nav.Link as={NavLink} to="/" className="text-light">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={NavLink} to="/login" className="text-light">
//                   Courses
//                 </Nav.Link>

//                 {!user ? (
//                   <>
//                     <Nav.Link as={NavLink} to="/login" className="text-light">
//                       Log In
//                     </Nav.Link>
//                     <NavDropdown
//   title="Sign up"
//   id="offcanvasNavbarDropdown-expand-md"
//   menuVariant="dark">
//   <NavDropdown.Item as={NavLink} to="/student-signup">
//     Student
//   </NavDropdown.Item>
//   <NavDropdown.Item as={NavLink} to="/instructor-signup">
//     Instructor
//   </NavDropdown.Item>
// </NavDropdown>

//                   </>
//                 ) : (
//                   <>
                   
//                     <Button
//                       variant="outline-light"
//                       size="sm"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 )}
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>

//       {/* ✅ Email Verification Banner */}
//       {isEmailNotVerified && (
//         <Alert
//           variant="warning"
//           className="rounded-0 text-center mb-0"
//         >
//           Your email is not verified. Please check your inbox to verify your account.
//         </Alert>
//       )}


//       {/* Nested Routes */}
//       <Container fluid className="px-4 py-3">
//         <Outlet />
//       </Container>
//     </>
//   );
// }

// export default LandingPage;
import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎓',
      title: 'Expert Courses',
      description: 'Learn from industry professionals and certified instructors'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Quizzes',
      description: 'Smart assessments tailored to your learning progress'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics'
    },
    {
      icon: '🎬',
      title: 'HD Video Lessons',
      description: 'High-quality video content streamed seamlessly'
    },
    {
      icon: '⏱️',
      title: 'Timed Assessments',
      description: 'Test your knowledge with timed quizzes and instant feedback'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Learn anywhere, anytime on any device'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
            <h1 
              className="display-3 fw-bold mb-4" 
              style={{ 
                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Welcome to Edunova
            </h1>
            <p className="lead text-muted mb-4">
              Your AI-Powered Personalized Learning Platform. Master new skills with 
              interactive video lessons and smart assessments.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button 
                variant="success" 
                size="lg"
                onClick={() => navigate('/student-signup')}
                className="px-4"
                style={{
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                  border: 'none'
                }}
              >
                Start Learning
              </Button>
              <Button 
                variant="outline-success" 
                size="lg"
                onClick={() => navigate('/instructor-signup')}
                className="px-4"
              >
                Become an Instructor
              </Button>
            </div>
            <p className="text-muted mt-3 small">
              Already have an account?{' '}
              <Link to="/login" className="fw-bold text-decoration-none"  style={{ color: 'var(--primary-color)' }}>
            Sign in here
         </Link>
            </p>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center">
                <div style={{ fontSize: '8rem' }} className="mb-3">📚</div>
                <h4 className="mb-3">Join Thousands of Learners</h4>
                <Row className="text-center">
                  <Col xs={4}>
                    <h3 className="text-success mb-0">500+</h3>
                    <small className="text-muted">Courses</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-success mb-0">10K+</h3>
                    <small className="text-muted">Students</small>
                  </Col>
                  <Col xs={4}>
                    <h3 className="text-success mb-0">200+</h3>
                    <small className="text-muted">Instructors</small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <div style={{ background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)' }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose Edunova?</h2>
            <p className="text-muted">Everything you need for a complete learning experience</p>
          </div>
          
          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col key={idx} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm hover-shadow" style={{ transition: 'all 0.3s' }}>
                  <Card.Body className="text-center p-4">
                    <div style={{ fontSize: '3.5rem' }} className="mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* How It Works Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">How It Works</h2>
          <p className="text-muted">Get started in just 3 simple steps</p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center p-4">
              <div 
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                1
              </div>
              <h5 className="fw-bold mb-3">Sign Up</h5>
              <p className="text-muted">Create your free account in seconds</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center p-4">
              <div 
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                2
              </div>
              <h5 className="fw-bold mb-3">Choose Courses</h5>
              <p className="text-muted">Browse and select courses that interest you</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center p-4">
              <div 
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                3
              </div>
              <h5 className="fw-bold mb-3">Start Learning</h5>
              <p className="text-muted">Watch videos, take quizzes, and master skills</p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' }} className="py-5">
        <Container>
          <div className="text-center text-white mb-5">
            <h2 className="fw-bold mb-3">What Our Students Say</h2>
            <p className="mb-0">Join thousands of satisfied learners</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">⭐⭐⭐⭐⭐</div>
                  <p className="mb-3">
                    "The AI-powered quizzes really helped me understand the concepts better. 
                    Highly recommend!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{ fontSize: '2.5rem' }}>👨‍💼</div>
                    <div>
                      <strong>John Doe</strong>
                      <div className="text-muted small">Software Developer</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">⭐⭐⭐⭐⭐</div>
                  <p className="mb-3">
                    "Best learning platform I've used. The video quality is amazing and 
                    the content is top-notch!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{ fontSize: '2.5rem' }}>👩‍🎓</div>
                    <div>
                      <strong>Sarah Smith</strong>
                      <div className="text-muted small">Data Analyst</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">⭐⭐⭐⭐⭐</div>
                  <p className="mb-3">
                    "As an instructor, I love how easy it is to create and manage courses. 
                    Great platform!"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{ fontSize: '2.5rem' }}>👨‍🏫</div>
                    <div>
                      <strong>Mike Johnson</strong>
                      <div className="text-muted small">Course Instructor</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center">
                <h3 className="mb-4">Ready to Start Your Learning Journey?</h3>
                <p className="text-muted mb-4">
                  Join thousands of students already learning on Edunova. 
                  Create your free account today!
                </p>
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={() => navigate('/student-signup')}
                    style={{
                      background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                      border: 'none'
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="lg"
                    onClick={() => navigate('/courses')}
                  >
                    Browse Courses
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <div style={{ background: '#0f172a' }} className="text-white py-4">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <h5 className="mb-2" style={{ color: '#2ad3c5ff' }}>📚 Edunova</h5>
              <p className="mb-0 small " style={{ color: '#f7fefdff' }}>
                Your AI-Powered Learning Platform
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0 small" style={{color: '#b4bbbbff'}}>
                © 2025 Edunova. All rights reserved.
              </p>
               <p className="mb-0 small" style={{color: '#b4bbbbff'}}>
                Contact: rraj1572527@gmail.com.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Outlet/>
    </div>
  );
}

export default WelcomePage;