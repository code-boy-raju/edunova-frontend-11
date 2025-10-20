import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../redux/actions/courseActions';
import { Card, Form, Button, Toast, ToastContainer, Alert } from 'react-bootstrap';

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToastMsg('Please fix the errors in the form');
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      await dispatch(createCourse(formData, navigate, (msg) => {
        setToastMsg(msg);
        setShowToast(true);
      }));
    } catch (error) {
      console.error('Failed to create course:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back to Courses
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Create New Course</h2>
          
          <Alert variant="info">
            <strong>💡 Tip:</strong> Create a clear, descriptive course that students will love!
          </Alert>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="e.g., Introduction to React"
                value={formData.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                placeholder="Describe what students will learn in this course..."
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {formData.description.length} characters (minimum 20)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Category (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="e.g., Programming, Design, Business"
                value={formData.category}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Help students find your course easier
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? 'Creating...' : '✓ Create Course'}
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3" style={{ marginTop: '4rem' }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastMsg.includes('successfully') ? 'success' : 'danger'}
        >
          <Toast.Header>
            <strong className="me-auto">Course Creation</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default CreateCourse;