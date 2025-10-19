import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, deleteCourse } from '../../redux/actions/courseActions';
import { Row, Col, Card, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

function InstructorCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter courses created by this instructor
  const myCourses = courses.filter(course => 
    course.createdBy?._id === user?.id || course.createdBy === user?.id
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await dispatch(deleteCourse(id, (msg) => {
          setToastMsg(msg);
          setShowToast(true);
        }));
        dispatch(fetchCourses()); // Refresh list
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading your courses..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>My Courses</h2>
          <p className="text-muted mb-0">Manage your courses and lessons</p>
        </div>
        <Button 
          variant="success" 
          onClick={() => navigate('/instructor-dashboard/create-course')}
        >
          ➕ Create New Course
        </Button>
      </div>

      {myCourses.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No Courses Yet"
          message="Create your first course and start teaching!"
          actionLabel="Create Course"
          onAction={() => navigate('/instructor-dashboard/create-course')}
        />
      ) : (
        <Row xs={1} md={2} className="g-4">
          {myCourses.map(course => (
            <Col key={course._id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="mb-0">{course.title}</Card.Title>
                    {course.category && (
                      <Badge bg="success">{course.category}</Badge>
                    )}
                  </div>
                  
                  <Card.Text className="text-muted">
                    {course.description?.substring(0, 150)}
                    {course.description?.length > 150 ? '...' : ''}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                      📖 {course.lessons?.length || 0} lessons
                    </small>
                    <small className="text-muted">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/instructor-dashboard/course/${course._id}/lessons`)}
                    >
                      📝 Manage Lessons
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => navigate(`/instructor-dashboard/edit-course/${course._id}`)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <ToastContainer position="top-end" className="p-3" style={{ marginTop: '4rem' }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">✓ Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default InstructorCourses;
