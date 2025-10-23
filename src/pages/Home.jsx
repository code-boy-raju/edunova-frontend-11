
import { FaBars, FaTimes,FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Container, Row, Col, Card, Button, Navbar, Nav, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/welcome.css";
function WelcomePage() {
 const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggle = () => setIsNavOpen(!isNavOpen);
  const handleClose = () => setIsNavOpen(false);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    { icon: "🎓", title: "Expert Courses", description: "Learn from industry professionals and certified instructors" },
    { icon: "🤖", title: "AI-Powered Quizzes", description: "Smart assessments tailored to your learning progress" },
    { icon: "📊", title: "Track Progress", description: "Monitor your learning journey with detailed analytics" },
    { icon: "🎬", title: "HD Video Lessons", description: "High-quality video content streamed seamlessly" },
    { icon: "⏱️", title: "Timed Assessments", description: "Test your knowledge with instant feedback" },
    { icon: "📱", title: "Mobile Friendly", description: "Learn anywhere, anytime on any device" },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Software Developer",
      text: "The AI-powered quizzes really helped me understand the concepts better. Highly recommend!",
      emoji: "👨‍💼",
    },
    {
      name: "Sarah Smith",
      role: "Data Analyst",
      text: "Best learning platform I've used. The video quality is amazing and the content is top-notch!",
      emoji: "👩‍🎓",
    },
    {
      name: "Mike Johnson",
      role: "Instructor",
      text: "As an instructor, I love how easy it is to create and manage courses. Great platform!",
      emoji: "👨‍🏫",
    },
    {
      name: "Emily Chen",
      role: "UI/UX Designer",
      text: "The interactive videos and personalized suggestions made my learning so smooth.",
      emoji: "👩‍💻",
    },
     {
      name: "Sarah Smith",
      role: "Data Analyst",
      text: "Best learning platform I've used. The video quality is amazing and the content is top-notch!",
      emoji: "👩‍🎓",
    },
    {
      name: "Mike Johnson",
      role: "Instructor",
      text: "As an instructor, I love how easy it is to create and manage courses. Great platform!",
      emoji: "👨‍🏫",
    },
    {
      name: "Emily Chen",
      role: "UI/UX Designer",
      text: "The interactive videos and personalized suggestions made my learning so smooth.",
      emoji: "👩‍💻",
    },
  ];

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* 🌐 Navbar */}
      <Navbar expand="lg" bg="light" className="py-3 shadow-sm sticky-top">
        <Container>
          {/* Brand */}
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="fw-bold fs-3 text-teal-700"
            style={{ cursor: "pointer" }}
          >
            📚 Edunova
          </Navbar.Brand>

          {/* Custom Toggle Button */}
          <button
            className="navbar-toggler border-0 bg-transparent"
            onClick={handleToggle}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? (
              <FaTimes size={24} color="#0f766e" /> // ❌ Close icon
            ) : (
              <FaBars size={24} color="#0f766e" /> // ☰ Hamburger icon
            )}
          </button>

          {/* Collapse Menu */}
          <Navbar.Collapse
            in={isNavOpen}
            className={`justify-content-end ${isNavOpen ? "show" : ""}`}
          >
            <Nav className="ms-auto align-items-center text-center">
              <Nav.Link as={Link} to="/courses" onClick={handleClose}>
                Browse Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleClose}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/student-signup" onClick={handleClose}>
                Student Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/instructor-signup" onClick={handleClose}>
                Instructor Signup
              </Nav.Link>
              <Button
                variant="success"
                onClick={() => {
                  navigate("/student-signup");
                  handleClose();
                }}
                className="ms-3 px-4 mt-2 mt-lg-0"
                style={{
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  border: "none",
                }}
              >
                Start Learning
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🏠 Hero Section */}
      <Container className="py-5 text-center text-lg-start">
        <Row className="align-items-center">
          <Col lg={6} data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-4 text-gradient">
              Learn Smarter, <br /> Achieve Faster with Edunova
            </h1>
            <p className="lead text-muted mb-4">
              Experience the future of learning with AI-driven courses, interactive videos, and smart quizzes — all in one place.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate("/student-signup")}
                className="px-4"
                style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)", border: "none" }}
              >
                Get Started
              </Button>
              <Button variant="outline-success" size="lg" onClick={() => navigate("/courses")} className="px-4">
                Browse Courses
              </Button>
            </div>
          </Col>
    <Col
  lg={6}
  className="text-center mt-5 mt-lg-0 position-relative hero-image-wrapper"
  data-aos="fade-left"
>
  <div className="crystal crystal-top-right"></div>
  <div className="crystal crystal-bottom-left"></div>

  <img
    src="/student png.png"
    alt="Learning illustration"
    className="img-fluid hero-image"
  />
</Col>


        </Row>
      </Container>

      {/* 💡 Features Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Why Choose Edunova?</h2>
          <p className="text-muted">Your path to mastering skills made simple.</p>
        </div>
        <Row className="g-4">
          {features.map((f, i) => (
            <Col key={i} md={6} lg={4}>
              <motion.div data-aos="zoom-in">
                <Card className="border-0 shadow-sm text-center p-4 h-100">
                  <div style={{ fontSize: "3rem" }}>{f.icon}</div>
                  <h5 className="fw-bold mt-3">{f.title}</h5>
                  <p className="text-muted">{f.description}</p>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

  
     {/* ⚙️ How It Works */}
<div className="how-it-works-section py-5">
  <Container>
    <div className="text-center mb-5">
      <h2 className="fw-bold mb-3">How It Works</h2>
      <p className="text-muted">Get started in just 3 easy steps</p>
    </div>

    <Row className="g-4 justify-content-center">
      {["Sign Up", "Choose Courses", "Start Learning"].map((step, i) => (
        <Col md={4} sm={6} xs={12} key={i}>
          <Card className="how-card border-0 text-center p-4 shadow-sm" data-aos="fade-up">
            <div className="how-icon mx-auto mb-3 d-flex align-items-center justify-content-center">
              {i + 1}
            </div>
            <h5 className="fw-bold mb-2">{step}</h5>
            <p className="text-muted">
              {i === 0
                ? "Create your free account instantly."
                : i === 1
                ? "Pick courses that align with your goals."
                : "Watch lessons, complete quizzes, and grow!"}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</div>

      {/* 🌟 Testimonials Section */}
<div
  className="testimonials-section py-5"
  style={{
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    color: "white",
  }}
>
  <Container>
    <div className="text-center mb-5">
      <h2 className="fw-bold mb-2">What Our Students Say</h2>
      <p className="mb-0">Hear from learners who’ve transformed their skills.</p>
    </div>

    <div className="testimonial-slider">
      <div className="testimonial-track">
        {testimonials.map((t, i) => (
          <Card key={i} className="testimonial-card border-0 shadow-sm text-dark">
            <div className="text-center fs-1 mb-3">{t.emoji}</div>
             <div className="mb-3 text-center">⭐⭐⭐⭐⭐</div>
            <p className="text-center mb-4 px-3" style={{ fontStyle: "italic" }}>
              “{t.text}”
            </p>
            <div className="text-center mb-2">
              <strong>{t.name}</strong>
            </div>
            <div className="text-center text-muted small">{t.role}</div>
          </Card>
        ))}
        {/* Duplicate for infinite scroll effect */}
        {testimonials.map((t, i) => (
          <Card key={`dup-${i}`} className="testimonial-card border-0 shadow-sm text-dark">
            <div className="text-center fs-1 mb-3">{t.emoji}</div>
            <p className="text-center mb-4 px-3" style={{ fontStyle: "italic" }}>
              “{t.text}”
            </p>
            <div className="text-center mb-2">
              <strong>{t.name}</strong>
            </div>
            <div className="text-center text-muted small">{t.role}</div>
          </Card>
        ))}
      </div>
    </div>
  </Container>
</div>



{/* 🧭 Footer */}
   <footer className="footer-section py-5 text-white">
      <Container>
        <Row className="gy-4 gx-5 justify-content-between text-md-start text-center">
          {/* Brand Info */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold text-teal-300 mb-3">Edunova</h5>
            <p className="small text-gray">
              Empowering learners worldwide with AI-driven education.
            </p>
          </Col>

          {/* Explore */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold text-teal-200 mb-3">Explore</h6>
            <ul className="footer-links list-unstyled small">
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/instructors">Instructors</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </Col>

          {/* Support */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold text-teal-200 mb-3">Support</h6>
            <ul className="footer-links list-unstyled small">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold text-teal-200 mb-3">Follow Us</h6>
            <div className="d-flex justify-content-md-start justify-content-center gap-3">
              <a href="#" className="social-icon" aria-label="LinkedIn" style={{color:"blue"}}>
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter" style={{color:"skyblue"}}>
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram"style={{color:"orange"}}>
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook"style={{color:"blue"}}>
                <FaFacebook />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider my-4" />

        <p className="small text-center text-gray mb-0">
          © 2025 Edunova. All rights reserved.
        </p>
      </Container>
    </footer>
      <Outlet />
    </div>
  );
}

export default WelcomePage;
