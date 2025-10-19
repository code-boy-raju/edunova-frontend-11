import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails, updateCourse } from '../../redux/actions/courseActions';
import { Card, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';

function EditCourse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const course = await dispatch(fetchCourseDetails(id));
        setFormData({
          title: course.title || '',
          description: course.description || '',
          category: course.category || ''
        });
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await dispatch(updateCourse(id, formData, navigate, (msg) => {
        setToastMsg(msg);
        setShowToast(true);
      }));
    } catch (error) {
      console.error('Failed to update course:', error);
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading course..." />;

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Edit Course</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success" disabled={updating}>
                {updating ? 'Updating...' : '✓ Update Course'}
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
            <strong className="me-auto">Course Update</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default EditCourse;