import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../../redux/actions/courseActions';
import { Card, Row, Col, Badge, Button, Alert, Table, Container } from 'react-bootstrap';
import './Student_styles/purchaseHistory.css';

function PurchaseHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { courses } = useSelector(state => state.courses);
  
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchaseHistory();
    dispatch(fetchCourses());
  }, [user, dispatch]);

  useEffect(() => {
    if (courses.length > 0 && purchasedCourses.length > 0) {
      mapPurchasesToCourses();
    }
  }, [courses, purchasedCourses]);

  const loadPurchaseHistory = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Load purchased course IDs
      const result = await window.storage.get(`purchased_courses_${user._id}`);
      if (result) {
        const courseIds = JSON.parse(result.value);
        setPurchasedCourses(courseIds);
        
        // Load purchase timestamps
        await loadPurchaseTimestamps(courseIds);
      }
    } catch (error) {
      console.log('No purchase history found');
      setPurchasedCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPurchaseTimestamps = async (courseIds) => {
    const details = [];
    
    for (const courseId of courseIds) {
      try {
        const timestampResult = await window.localStorage.getItem(`purchase_timestamp_${user._id}_${courseId}`);
        
        if (timestampResult) {
          details.push({
            courseId,
            timestamp: JSON.parse(timestampResult)
          });
        } else {
          // If no timestamp exists, create one now (for existing purchases)
          const now = new Date().toISOString();
          await window.localStorage.setItem(`purchase_timestamp_${user._id}_${courseId}`, JSON.stringify(now));
          details.push({
            courseId,
            timestamp: now
          });
        }
      } catch (error) {
        // Create timestamp for courses without one
        const now = new Date().toISOString();
        await window.localStorage.setItem(`purchase_timestamp_${user._id}_${courseId}`, JSON.stringify(now));
        details.push({
          courseId,
          timestamp: now
        });
      }
    }
    
    // Sort by timestamp (newest first)
    details.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPurchaseDetails(details);
  };

  const mapPurchasesToCourses = () => {
    const mapped = purchaseDetails.map(detail => {
      const course = courses.find(c => c._id === detail.courseId);
      return {
        ...detail,
        course
      };
    }).filter(item => item.course); // Filter out any courses that weren't found
    
    setPurchaseDetails(mapped);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const purchaseDate = new Date(timestamp);
    const diffTime = Math.abs(now - purchaseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading purchase history...</p>
      </div>
    );
  }

  return (
    <div className="purchase-history-container">
      <Container fluid>
        {/* Header */}
        <div className="page-header mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-2 fw-bold">
                <i className="bi bi-clock-history me-3"></i>
                Purchase History
              </h2>
              <p className="text-muted mb-0">
                View all your course purchases and enrollments
              </p>
            </div>
            <Badge bg="primary" pill className="purchase-count-badge">
              {purchasedCourses.length} Purchase{purchasedCourses.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        {purchasedCourses.length > 0 && (
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Card className="stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="stat-icon mb-3">
                    <i className="bi bi-book-fill"></i>
                  </div>
                  <h3 className="stat-number text-primary mb-1">{purchasedCourses.length}</h3>
                  <p className="stat-label text-muted mb-0">Total Courses</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="stat-icon mb-3">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <h3 className="stat-number text-success mb-1">
                    {purchaseDetails[0] ? getTimeAgo(purchaseDetails[0].timestamp) : 'N/A'}
                  </h3>
                  <p className="stat-label text-muted mb-0">Last Purchase</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="stat-icon mb-3">
                    <i className="bi bi-trophy-fill"></i>
                  </div>
                  <h3 className="stat-number text-warning mb-1">
                    {Math.floor((purchasedCourses.length / Math.max(courses.length, 1)) * 100)}%
                  </h3>
                  <p className="stat-label text-muted mb-0">Catalog Coverage</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Purchase History Content */}
        {purchasedCourses.length === 0 ? (
          <Card className="empty-state-card border-0 shadow-sm text-center py-5">
            <Card.Body>
              <div className="empty-icon mb-4">
                <i className="bi bi-bag-x"></i>
              </div>
              <h4 className="mb-3">No Purchase History</h4>
              <p className="text-muted mb-4">
                You haven't purchased any courses yet. Start exploring our course catalog!
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/student-dashboard/courses')}
              >
                <i className="bi bi-search me-2"></i>
                Browse Courses
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <Card className="purchase-table-card border-0 shadow-sm d-none d-md-block">
              <Card.Body className="p-0">
                <Table responsive hover className="purchase-table mb-0">
                  <thead>
                    <tr>
                      <th className="ps-4">Course</th>
                      <th>Category</th>
                      <th>Instructor</th>
                      <th>Purchase Date</th>
                      <th>Status</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseDetails.map((item, index) => (
                      <tr key={item.courseId} className="purchase-row">
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="course-thumbnail">
                              <span className="course-number">{index + 1}</span>
                            </div>
                            <div>
                              <h6 className="mb-1 fw-semibold">{item.course?.title || 'Unknown Course'}</h6>
                              <small className="text-muted">
                                {getTimeAgo(item.timestamp)}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="primary" className="category-badge">
                            {item.course?.category || 'N/A'}
                          </Badge>
                        </td>
                        <td className="text-muted">
                          <i className="bi bi-person-circle me-2"></i>
                          {item.course?.createdBy?.username || 'Unknown'}
                        </td>
                        <td className="text-muted">
                          {formatDate(item.timestamp)}
                        </td>
                        <td>
                          <Badge bg="success" className="status-badge">
                            <i className="bi bi-check-circle me-1"></i>
                            Active
                          </Badge>
                        </td>
                        <td className="text-end pe-4">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate(`/student-dashboard/course/${item.courseId}`)}
                          >
                            Open Course
                            <i className="bi bi-arrow-right ms-2"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Mobile Card View */}
            <div className="d-md-none">
              {purchaseDetails.map((item, index) => (
                <Card key={item.courseId} className="purchase-mobile-card border-0 shadow-sm mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <Badge bg="primary" className="mb-2">
                          {item.course?.category || 'N/A'}
                        </Badge>
                        <h6 className="fw-semibold mb-1">{item.course?.title || 'Unknown Course'}</h6>
                        <small className="text-muted">
                          <i className="bi bi-person-circle me-1"></i>
                          {item.course?.createdBy?.username || 'Unknown'}
                        </small>
                      </div>
                      <Badge bg="success">Active</Badge>
                    </div>
                    
                    <div className="purchase-meta mb-3">
                      <div className="d-flex justify-content-between text-muted small">
                        <span>
                          <i className="bi bi-calendar3 me-1"></i>
                          {getTimeAgo(item.timestamp)}
                        </span>
                        <span>
                          <i className="bi bi-clock me-1"></i>
                          {formatDate(item.timestamp).split(',')[0]}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate(`/student-dashboard/course/${item.courseId}`)}
                    >
                      Open Course
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* Summary Footer */}
            <Alert variant="info" className="mt-4 d-flex align-items-center">
              <i className="bi bi-info-circle-fill me-3"></i>
              <div>
                <strong>Keep Learning!</strong> You have access to all {purchasedCourses.length} purchased courses. 
                Continue your learning journey anytime.
              </div>
            </Alert>
          </>
        )}
      </Container>
    </div>
  );
}

export default PurchaseHistory;