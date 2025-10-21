// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCourseDetails } from '../../redux/actions/courseActions';
// import { fetchLessonsByCourse } from '../../redux/actions/lessonActions';
// import { Card, Button, ListGroup, Badge, Alert ,Row,Col} from 'react-bootstrap';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function CourseDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);
//   const { lessons } = useSelector(state => state.lessons);
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadCourse = async () => {
//       try {
//         setLoading(true);
//         const courseData = await dispatch(fetchCourseDetails(id));
//         setCourse(courseData);
//         await dispatch(fetchLessonsByCourse(id));
//       } catch (error) {
//         console.error('Failed to load course:', error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCourse();
//   }, [id, dispatch]);

//   if (loading) return <LoadingSpinner message="Loading course details..." />;

//   if (error || !course) {
//     return (
//       <Alert variant="danger">
//         <Alert.Heading>Course Not Found</Alert.Heading>
//         <p>The course you're looking for doesn't exist or has been removed.</p>
//         <Button variant="outline-danger" onClick={() => navigate(-1)}>
//           Go Back
//         </Button>
//       </Alert>
//     );
//   }

//   const basePath = user?.role === 'student' ? '/student-dashboard' : '';

//   return (
//     <div>
//       <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
//         ← Back to Courses
//       </Button>

//       {/* Course Header */}
//       <Card className="shadow-sm mb-4">
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-start">
//             <div>
//               <h2 className="text-success mb-2">{course.title}</h2>
//               {course.category && (
//                 <Badge bg="success" className="mb-3">{course.category}</Badge>
//               )}
//             </div>
//             <div className="text-end">
//               <div className="text-muted small">Created by</div>
//               <strong>{course.createdBy?.username|| "UNKNOWN"}</strong>
//             </div>
//           </div>
//           <p className="mt-3 text-muted mb-0">{course.description}</p>
//         </Card.Body>
//       </Card>

//       {/* Course Stats */}
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Card.Body>
//               <h3 className="text-primary">{lessons.length}</h3>
//               <p className="text-muted mb-0">Total Lessons</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Lessons List */}
//       <h4 className="mb-3">Course Content ({lessons.length} lessons)</h4>
      
//       {lessons.length === 0 ? (
//         <Alert variant="info">
//           <i className="bi bi-info-circle me-2"></i>
//           No lessons available yet. Check back later!
//         </Alert>
//       ) : (
//        <ListGroup>
//   {lessons.map((lesson, idx) => (
//     <ListGroup.Item
//       key={lesson._id}
//       className="d-flex justify-content-between align-items-center hover-shadow"
//       onClick={() => navigate(`${basePath}/lesson/${lesson._id}`)}
//       style={{ cursor: 'pointer', transition: 'all 0.3s' }}
//     >
//       <div className="d-flex align-items-center gap-3 flex-grow-1">
//         <Badge
//           bg="secondary"
//           style={{ minWidth: '40px', fontSize: '1rem' }}
//         >
//           {lesson.order || idx + 1}
//         </Badge>
//         <div>
//           <strong className="d-block">{lesson.title}</strong>
//           <small className="text-muted">{lesson.description}</small>
//         </div>
//       </div>
//       <span className="text-success fw-semibold">
//         Start Lesson →
//       </span>
//     </ListGroup.Item>
//   ))}
// </ListGroup>

//       )}
//     </div>
//   );
// }

// export default CourseDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../redux/actions/courseActions';
import { fetchLessonsByCourse } from '../../redux/actions/lessonActions';
import { Card, Button, ListGroup, Badge, Alert, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { lessons } = useSelector(state => state.lessons);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const courseData = await dispatch(fetchCourseDetails(id));
        setCourse(courseData);
        await dispatch(fetchLessonsByCourse(id));
      } catch (error) {
        console.error('Failed to load course:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id, dispatch]);

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

  return (
    <div className="course-details-container">
      {/* Back Button */}
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back to Courses
      </Button>

      {/* Course Header */}
      <Card className="shadow-sm mb-4 course-header-card">
        <Card.Body>
          <div className="course-header">
            <div className="course-title-section">
              <h2 className="text-success mb-2">{course.title}</h2>
              {course.category && (
                <Badge bg="success" className="mb-3">{course.category}</Badge>
              )}
            </div>
            <div className="course-author">
              <div className="text-muted small">Created by</div>
              <strong>{course.createdBy?.username || "UNKNOWN"}</strong>
            </div>
          </div>
          <p className="mt-3 text-muted mb-0 course-description">{course.description}</p>
        </Card.Body>
      </Card>

      {/* Course Stats */}
      <Row className="mb-4 g-3">
        <Col xs={12} md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-primary">{lessons.length}</h3>
              <p className="text-muted mb-0">Total Lessons</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lessons List */}
      <h4 className="mb-3">Course Content ({lessons.length} lessons)</h4>

      {lessons.length === 0 ? (
        <Alert variant="info">
          <i className="bi bi-info-circle me-2"></i>
          No lessons available yet. Check back later!
        </Alert>
      ) : (
        <ListGroup className="lesson-list">
          {lessons.map((lesson, idx) => (
            <ListGroup.Item
              key={lesson._id}
              className="lesson-item"
              onClick={basePath?() => navigate(`${basePath}/lesson/${lesson._id}`):(<Alert variant="info">
          <i className="bi bi-info-circle me-2"></i>
    Please Login first to access the lesson.
        </Alert>)}
            >
              <div className="lesson-content">
                <Badge className="lesson-badge" bg="secondary">
                  {lesson.order || idx + 1}
                </Badge>
                <div className="lesson-info">
                  <strong className="lesson-title">{lesson.title}</strong>
                  <small className="text-muted lesson-desc">{lesson.description}</small>
                </div>
              </div>
              <span className="lesson-link">Start Lesson →</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default CourseDetails;
