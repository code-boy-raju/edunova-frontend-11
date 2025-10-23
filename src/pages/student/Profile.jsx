import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import './Student_styles/profile.css';

function Profile() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    phone: '',
    location: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursLearned: 0,
    certificatesEarned: 0
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadPurchasedCourses();
    }
  }, [user]);

  const loadUserProfile = async () => {
    // Load profile from storage or use user data
    try {
      const result = await window.localStorage.getItem(`user_profile_${user._id}`);
      if (result) {
        const profile = JSON.parse(result);
        setFormData(profile);
      } else {
        // Initialize with user data
        setFormData({
          username: user.username || '',
          email: user.email || '',
          bio: '',
          phone: '',
          location: ''
        });
      }
    } catch (error) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: '',
        phone: '',
        location: ''
      });
    }
  };

  const loadPurchasedCourses = async () => {
    try {
      const result = await window.localStorage.getItem(`purchased_courses_${user._id}`);
      if (result) {
        const courses = JSON.parse(result || '[]');
        setPurchasedCount(courses.length);
        // Calculate mock stats based on purchased courses
        setStats({
          coursesCompleted: Math.floor(courses.length * 0.6),
          hoursLearned: courses.length * 15,
          certificatesEarned: Math.floor(courses.length * 0.4)
        });
      }
    } catch (error) {
      console.log('No purchased courses found');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save profile to storage
      await window.localStorage.setItem(`user_profile_${user._id}`, JSON.stringify(formData));
      
      setShowSuccess(true);
      setIsEditing(false);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadUserProfile(); // Reset to original data
  };

  return (
    <div className="profile-container">
      <Container fluid>
        {/* Header */}
        <div className="profile-header mb-4">
          <h2 className="mb-2 fw-bold">
            <i className="bi bi-person-gear me-3"></i>
            My Profile
          </h2>
          <p className="text-muted mb-0">Manage your account settings and preferences</p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <Alert variant="success" dismissible onClose={() => setShowSuccess(false)} className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i>
            Profile updated successfully!
          </Alert>
        )}

        <Row className="g-4">
          {/* Left Column - Profile Info */}
          <Col lg={4}>
            {/* Profile Card */}
            <Card className="profile-card border-0 shadow-sm mb-4">
              <Card.Body className="text-center p-4">
                <div className="profile-avatar-large mb-3">
                  <i className="bi bi-person-circle"></i>
                </div>
                <h4 className="mb-1">{formData.username}</h4>
                <p className="text-muted mb-3">{formData.email}</p>
                <Badge bg="primary" className="mb-3">Student</Badge>
                
                {formData.location && (
                  <p className="text-muted small mb-0">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {formData.location}
                  </p>
                )}
              </Card.Body>
            </Card>

            {/* Stats Card */}
            <Card className="stats-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3">Learning Statistics</h6>
                <ListGroup variant="flush" className="stats-list">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="text-muted">
                      <i className="bi bi-book-fill me-2 text-primary"></i>
                      Enrolled Courses
                    </span>
                    <strong className="text-primary">{purchasedCount}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="text-muted">
                      <i className="bi bi-check-circle-fill me-2 text-success"></i>
                      Completed
                    </span>
                    <strong className="text-success">{stats.coursesCompleted}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="text-muted">
                      <i className="bi bi-clock-fill me-2 text-warning"></i>
                      Hours Learned
                    </span>
                    <strong className="text-warning">{stats.hoursLearned}</strong>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Profile Form */}
          <Col lg={8}>
            <Card className="profile-form-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 fw-bold">Personal Information</h5>
                  {!isEditing && (
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Profile
                    </Button>
                  )}
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    {/* Username */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-person me-2"></i>
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Enter username"
                        />
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Enter email"
                        />
                      </Form.Group>
                    </Col>

                    {/* Phone */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-telephone me-2"></i>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Enter phone number"
                        />
                      </Form.Group>
                    </Col>

                    {/* Location */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-geo-alt me-2"></i>
                          Location
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Enter location"
                        />
                      </Form.Group>
                    </Col>

                    {/* Bio */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-card-text me-2"></i>
                          Bio
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Tell us about yourself..."
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="d-flex gap-2 mt-4">
                      <Button type="submit" variant="success" className="px-4">
                        <i className="bi bi-check-lg me-2"></i>
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline-secondary" 
                        className="px-4"
                        onClick={handleCancel}
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>

            {/* Account Settings Card */}
          
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;