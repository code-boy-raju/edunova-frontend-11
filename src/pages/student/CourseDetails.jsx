

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../redux/actions/courseActions';
import { fetchLessonsByCourse } from '../../redux/actions/lessonActions';
import { Card, Button, ListGroup, Badge, Alert, Row, Col, Accordion, ProgressBar, Container, Tab, Tabs } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Student_styles/courseDetails.css';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { lessons } = useSelector(state => state.lessons);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const courseData = await dispatch(fetchCourseDetails(id));
        setCourse(courseData);
        await dispatch(fetchLessonsByCourse(id));
        await checkPurchaseStatus();
      } catch (error) {
        console.error('Failed to load course:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id, dispatch, user]);

  const checkPurchaseStatus = async () => {
    if (!user) {
      setIsPurchased(false);
      return;
    }
    try {
      const result = await window.localStorage.getItem(`purchased_courses_${user._id}`);
      if (result) {
        const purchased = JSON.parse(result);
        setIsPurchased(purchased.includes(id));
      }
    } catch (error) {
      setIsPurchased(false);
    }
    };

  if (loading) return <LoadingSpinner message="Loading course details..." />;

  if (error || !course) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Course Not Found</Alert.Heading>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Alert>
    );
  }

  const basePath = user?.role === 'student' ? '/student-dashboard' : '';

  // Calculate course statistics
  const totalLessons = lessons.length;
  const estimatedDuration = totalLessons * 30; // Assuming 30 mins per lesson
  const difficultyLevel = course.difficulty || 'Intermediate';

  return (
    <div className="course-details-wrapper">
      <Container fluid>
        {/* Back Button */}
        <Button 
          variant="outline-secondary" 
          className="mb-4 back-button"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Courses
        </Button>

        {/* Course Hero Section */}
        <Card className="course-hero-card shadow-lg border-0 mb-4">
          <Row className="g-0">
            <Col lg={8} className="p-5">
              <div className="course-header-content">
                {course.category && (
                  <Badge bg="primary" className="mb-3 category-badge">
                    {course.category}
                  </Badge>
                )}
                <h1 className="course-title mb-3">{course.title}</h1>
                <p className="course-description lead text-muted mb-4">
                  {course.description}
                </p>
                
                <div className="course-author-section d-flex align-items-center gap-3 mb-4">
                  <div className="author-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <div className="text-muted small">Created by</div>
                    <strong className="author-name">{course.createdBy?.username || "Unknown"}</strong>
                  </div>
                </div>

                {isPurchased && (
                  <Alert variant="success" className="d-flex align-items-center gap-2 mb-0">
                    <i className="bi bi-check-circle-fill"></i>
                    <span className="fw-semibold">You own this course</span>
                  </Alert>
                )}
              </div>
            </Col>
            
            <Col lg={4} className="bg-light p-5 d-flex align-items-center">
              <div className="course-stats-box w-100">
                <h5 className="mb-4 fw-bold">Course Stats</h5>
                
                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">
                      <i className="bi bi-book me-2"></i>
                      Total Lessons
                    </span>
                    <strong className="text-primary fs-5">{totalLessons}</strong>
                  </div>
                </div>

                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">
                      <i className="bi bi-clock me-2"></i>
                      Duration
                    </span>
                    <strong className="text-primary">{Math.floor(estimatedDuration / 60)}h {estimatedDuration % 60}m</strong>
                  </div>
                </div>

                <div className="stat-item mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">
                      <i className="bi bi-bar-chart me-2"></i>
                      Level
                    </span>
                    <Badge bg="info">{difficultyLevel}</Badge>
                  </div>
                </div>

                {!isPurchased && user && (
                  <Button variant="success" size="lg" className="w-100 fw-semibold">
                    <i className="bi bi-cart-plus me-2"></i>
                    Enroll Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Tabs Section */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="course-tabs mb-4"
        >
          <Tab eventKey="overview" title={<span><i className="bi bi-info-circle me-2"></i>Overview</span>}>
            <Card className="border-0 shadow-sm p-4">
              <h4 className="mb-4">About This Course</h4>
              <p className="text-muted lead">{course.description}</p>
              
              <h5 className="mt-4 mb-3">What You'll Learn</h5>
              <Row>
                <Col md={6}>
                  <ul className="learning-objectives">
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Master key concepts and skills</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Build real-world projects</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Get hands-on experience</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="learning-objectives">
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Learn industry best practices</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Develop problem-solving skills</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i>Certificate of completion</li>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Tab>

          <Tab eventKey="curriculum" title={<span><i className="bi bi-list-ul me-2"></i>Curriculum</span>}>
            <Card className="border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Course Curriculum</h4>
                <Badge bg="secondary" pill>{totalLessons} Lessons</Badge>
              </div>

              {lessons.length === 0 ? (
                <Alert variant="info" className="d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle"></i>
                  <span>No lessons available yet. Check back later!</span>
                </Alert>
              ) : (
                <Accordion defaultActiveKey="0" className="curriculum-accordion">
                  {lessons.map((lesson, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={lesson._id} className="curriculum-item">
                      <Accordion.Header>
                        <div className="d-flex align-items-center gap-3 w-100">
                          <Badge bg="primary" pill className="lesson-number">
                            {lesson.order || idx + 1}
                          </Badge>
                          <div className="flex-grow-1">
                            <strong className="lesson-title-text">{lesson.title}</strong>
                          </div>
                          <div className="lesson-meta-info text-muted small">
                            <i className="bi bi-clock me-1"></i>
                            30 min
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="text-muted mb-3">{lesson.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="lesson-features">
                            <Badge bg="light" text="dark" className="me-2">
                              <i className="bi bi-play-circle me-1"></i>
                              Video
                            </Badge>
                            <Badge bg="light" text="dark" className="me-2">
                              <i className="bi bi-file-text me-1"></i>
                              Resources
                            </Badge>
                            <Badge bg="light" text="dark">
                              <i className="bi bi-pencil-square me-1"></i>
                              Quiz
                            </Badge>
                          </div>
                          {isPurchased ? (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => navigate(`${basePath}/lesson/${lesson._id}`)}
                            >
                              Start Lesson <i className="bi bi-arrow-right ms-1"></i>
                            </Button>
                          ) : (
                            <Button variant="outline-secondary" size="sm" disabled>
                              <i className="bi bi-lock me-1"></i>
                              Locked
                            </Button>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}

              {!isPurchased && user && lessons.length > 0 && (
                <div className="text-center mt-4 pt-4 border-top">
                  <p className="text-muted mb-3">Unlock all lessons and start learning today!</p>
                  <Button variant="success" size="lg" className="px-5">
                    <i className="bi bi-unlock me-2"></i>
                    Enroll in This Course
                  </Button>
                </div>
              )}
            </Card>
          </Tab>

          <Tab eventKey="instructor" title={<span><i className="bi bi-person me-2"></i>Instructor</span>}>
            <Card className="border-0 shadow-sm p-4">
              <div className="instructor-profile">
                <div className="d-flex align-items-start gap-4 mb-4">
                  <div className="instructor-avatar-large">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="mb-2">{course.createdBy?.username || "Unknown Instructor"}</h4>
                    <p className="text-muted mb-3">Expert {course.category} Instructor</p>
                    <div className="instructor-stats d-flex gap-4">
                      <div>
                        <strong className="d-block">12</strong>
                        <small className="text-muted">Courses</small>
                      </div>
                      <div>
                        <strong className="d-block">2,500+</strong>
                        <small className="text-muted">Students</small>
                      </div>
                      <div>
                        <strong className="d-block">4.8</strong>
                        <small className="text-muted">Rating</small>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted">
                  Passionate educator with years of experience in {course.category}. 
                  Dedicated to helping students achieve their learning goals through 
                  practical, hands-on instruction.
                </p>
              </div>
            </Card>
          </Tab>
        </Tabs>

        {/* CTA Section for Non-Purchased Courses */}
        {!isPurchased && user && (
          <Card className="border-0 shadow-sm bg-primary text-white p-5 text-center cta-card">
            <h3 className="mb-3">Ready to Start Learning?</h3>
            <p className="lead mb-4">Join thousands of students already learning with us</p>
            <Button variant="light" size="lg" className="px-5 fw-semibold">
              <i className="bi bi-cart-plus me-2"></i>
              Enroll Now
            </Button>
          </Card>
        )}

        {!user && (
          <Alert variant="warning" className="d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>
              Please <Button variant="link" className="p-0" onClick={() => navigate('/login')}>login</Button> to access course content
            </span>
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default CourseDetails;