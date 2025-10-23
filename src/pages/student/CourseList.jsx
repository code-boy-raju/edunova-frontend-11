
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/actions/courseActions';
import { Row, Col, Form, InputGroup, Alert, Badge, Button, Offcanvas, Card, ListGroup, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import './Student_styles/courseList.css';

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cart, setCart] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
    loadPurchasedCourses();
  }, [dispatch, user]);

  const loadPurchasedCourses = async () => {
    if (!user) return;
    try {
      const result = await window.localStorage.getItem(`purchased_courses_${user._id}`);
      if (result) {
        setPurchasedCourses(JSON.parse(result || '[]'));
      }
    } catch (error) {
      console.log('No purchased courses found');
      setPurchasedCourses([]);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(
      courses
        .map(c => c.category?.trim().toLowerCase())
        .filter(Boolean)
    )
  ].map(cat => cat.charAt(0).toUpperCase() + cat.slice(1));

  const basePath = user?.role === 'student' ? '/student-dashboard' : '';

  const addToCart = (course) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cart.find(c => c._id === course._id)) {
      showToastMessage('Course already in cart!');
      return;
    }
    if (purchasedCourses.includes(course._id)) {
      showToastMessage('You already own this course!');
      return;
    }
    setCart([...cart, course]);
    showToastMessage('Added to cart!');
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(c => c._id !== courseId));
  };

  const isPurchased = (courseId) => {
    return purchasedCourses.includes(courseId);
  };

  const isInCart = (courseId) => {
    return cart.some(c => c._id === courseId);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const cartIds = cart.map(c => c._id);
    const updatedPurchased = [...purchasedCourses, ...cartIds];
    
    try {
      // Save purchased courses
      await window.localStorage.setItem(`purchased_courses_${user._id}`, JSON.stringify(updatedPurchased));
      
      // Save purchase timestamps for each course
      const timestamp = new Date().toISOString();
      for (const courseId of cartIds) {
        await window.localStorage.setItem(`purchase_timestamp_${user._id}_${courseId}`, JSON.stringify(timestamp));
      }
      
      setPurchasedCourses(updatedPurchased);
      setCart([]);
      setShowCart(false);
      
      // Show success animation
      showSuccessAnimation();
    } catch (error) {
      console.error('Purchase failed:', error);
      showToastMessage('Purchase failed. Please try again.');
    }
  };

  const showSuccessAnimation = () => {
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
      <div class="success-animation">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h2 class="success-title">Purchase Successful!</h2>
        <p class="success-message">Your courses have been added to your library</p>
      </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.remove();
    }, 3000);
  };

  const EnhancedCourseCard = ({ course }) => (
    <Card className="course-card h-100 shadow-sm border-0">
      <div className="course-card-image">
        <div className="course-image-gradient">
          <span className="course-icon">📚</span>
        </div>
        {course.category && (
          <Badge bg="primary" className="course-category-badge">
            {course.category}
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="course-card-title mb-2">{course.title}</Card.Title>
        <Card.Text className="course-card-description text-muted flex-grow-1 mb-3">
          {course.description}
        </Card.Text>
        <div className="course-meta mb-3 pb-3 border-bottom">
          <small className="text-muted d-flex align-items-center gap-2">
            <i className="bi bi-person-circle"></i> 
            <span>{course.createdBy?.username || 'Unknown'}</span>
          </small>
        </div>
        <div className="d-flex gap-2">
          {isPurchased(course._id) ? (
            <>
              <Button 
                variant="success" 
                className="flex-grow-1 fw-semibold"
                disabled
              >
                ✓ Purchased
              </Button>
              <Button 
                variant="outline-primary"
                onClick={() => navigate(`${basePath}/course/${course._id}`)}
              >
                Open →
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline-primary" 
                className="flex-grow-1"
                onClick={() => addToCart(course)}
                disabled={isInCart(course._id)}
              >
                {isInCart(course._id) ? '✓ In Cart' : '🛒 Add to Cart'}
              </Button>
              <Button 
                variant="primary"
                onClick={() => navigate(`${basePath}/course/${course._id}`)}
              >
                View
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) return <LoadingSpinner message="Loading courses..." />;

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Courses</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div className="course-list-container fade-in">
      {/* Enhanced Header */}
      <div className="course-list-header d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="mb-1 fw-bold">Explore Courses</h2>
          <span className="text-muted">
            <i className="bi bi-book me-2"></i>
            {filteredCourses.length} courses available
          </span>
        </div>
        {user && (
          <Button 
            variant="primary" 
            className="cart-button position-relative shadow-sm"
            onClick={() => setShowCart(true)}
          >
            <i className="bi bi-cart3 me-2"></i>
            Cart
            {cart.length > 0 && (
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                {cart.length}
              </Badge>
            )}
          </Button>
        )}
      </div>

      {/* Enhanced Search & Filter */}
      <Row className="mb-4 g-3">
        <Col md={8}>
          <InputGroup size="lg" className="shadow-sm">
            <InputGroup.Text className="bg-white border-end-0">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search for courses, topics, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            size="lg"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="shadow-sm"
          >
            <option value="">🏷️ All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No courses found"
          message={
            searchTerm || categoryFilter
              ? 'Try adjusting your search or filters'
              : 'No courses available yet'
          }
        />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCourses.map(course => (
            <Col key={course._id}>
              <EnhancedCourseCard course={course} />
            </Col>
          ))}
        </Row>
      )}

      {/* Cart Offcanvas */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end" className="cart-offcanvas">
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold">
            <i className="bi bi-cart3 me-2"></i>
            Shopping Cart
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column p-0">
          {cart.length === 0 ? (
            <div className="text-center py-5 px-3">
              <div className="empty-cart-icon mb-3">🛒</div>
              <h5 className="mb-2">Your cart is empty</h5>
              <p className="text-muted">Browse courses and add them to your cart!</p>
              <Button variant="primary" onClick={() => setShowCart(false)} className="mt-3">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-grow-1 overflow-auto p-3">
                <ListGroup variant="flush">
                  {cart.map(course => (
                    <ListGroup.Item key={course._id} className="cart-item px-0 py-3">
                      <div className="d-flex gap-3">
                        <div className="cart-item-image flex-shrink-0">
                          <span>📚</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1 fw-semibold">{course.title}</h6>
                          <small className="text-muted d-block mb-1">{course.category}</small>
                          <small className="text-muted">
                            <i className="bi bi-person me-1"></i>
                            {course.createdBy?.username}
                          </small>
                        </div>
                        <Button 
                          variant="link" 
                          className="text-danger p-0 text-decoration-none"
                          onClick={() => removeFromCart(course._id)}
                          title="Remove from cart"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <div className="cart-footer p-3 border-top bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Total Items:</span>
                  <h5 className="mb-0 fw-bold">{cart.length} Course{cart.length > 1 ? 's' : ''}</h5>
                </div>
                <Button 
                  variant="success" 
                  className="w-100 fw-semibold py-2"
                  size="lg"
                  onClick={handlePurchase}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Complete Purchase
                </Button>
                <small className="text-muted d-block text-center mt-2">
                  Instant access to all courses
                </small>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Toast Notification */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          className="shadow"
          autohide
          delay={3000}
        >
          <Toast.Body className="text-center fw-semibold">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default CourseList;