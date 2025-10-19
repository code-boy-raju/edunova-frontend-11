// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { fetchCourseDetails } from '../../redux/actions/courseActions';
// import { fetchLessonsByCourse, deleteLesson } from '../../redux/actions/lessonActions';
// import { Card, Button, ListGroup, Badge, Alert, Toast, ToastContainer } from 'react-bootstrap';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function ManageLessons() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toastMsg, setToastMsg] = useState('');
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [id]);

//   const loadData = async () => {
//     try {
//       const courseData = await dispatch(fetchCourseDetails(id));
//       setCourse(courseData);
//       const lessonsData = await dispatch(fetchLessonsByCourse(id));
//       setLessons(lessonsData);
//     } catch (error) {
//       console.error('Failed to load data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteLesson = async (lessonId) => {
//     if (window.confirm('Are you sure you want to delete this lesson?')) {
//       try {
//         await dispatch(deleteLesson(lessonId, (msg) => {
//           setToastMsg(msg);
//           setShowToast(true);
//         }));
//         // Refresh lessons
//         const lessonsData = await dispatch(fetchLessonsByCourse(id));
//         setLessons(lessonsData);
//       } catch (error) {
//         console.error('Failed to delete lesson:', error);
//       }
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   if (!course) {
//     return <Alert variant="danger">Course not found</Alert>;
//   }

//   return (
//     <div>
//       <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
//         ← Back to Courses
//       </Button>

//       <Card className="shadow-sm mb-4">
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h2 className="text-success">{course.title}</h2>
//               {course.category && <Badge bg="success">{course.category}</Badge>}
//             </div>
//             <Button
//               variant="success"
//               onClick={() => navigate(`/instructor-dashboard/course/${id}/create-lesson`)}
//             >
//               ➕ Add Lesson
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       <h4 className="mb-3">Lessons ({lessons.length})</h4>

//       {lessons.length === 0 ? (
//         <Alert variant="info">
//           No lessons yet. Create your first lesson to get started!
//         </Alert>
//       ) : (
//         <ListGroup>
//           {lessons.map((lesson) => (
//             <ListGroup.Item
//               key={lesson._id}
//               className="d-flex justify-content-between align-items-start"
//             >
//               <div className="flex-grow-1">
//                 <Badge bg="secondary" className="me-2">{lesson.order}</Badge>
//                 <strong>{lesson.title}</strong>
//                 <p className="mb-0 text-muted small mt-1">{lesson.description}</p>
//               </div>
//               <div className="d-flex gap-2">
//                 <Button
//                   variant="outline-primary"
//                   size="sm"
//                   onClick={() => window.open(lesson.videourl, '_blank')}
//                 >
//                   View Video
//                 </Button>
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   onClick={() => handleDeleteLesson(lesson._id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       )}

//       <ToastContainer position="top-end" className="pe-2" style={{ marginTop: '4rem' }}>
//         <Toast
//           onClose={() => setShowToast(false)}
//           show={showToast}
//           delay={3000}
//           autohide
//           bg="success"
//         >
//           <Toast.Header>
//             <strong className="me-auto">Success</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">{toastMsg}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </div>
//   );
// }

// export default ManageLessons;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCourseDetails } from '../../redux/actions/courseActions';
import { fetchLessonsByCourse, deleteLesson } from '../../redux/actions/lessonActions';
import { Card, Button, ListGroup, Badge, Alert, Toast, ToastContainer } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

function ManageLessons() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const courseData = await dispatch(fetchCourseDetails(id));
      setCourse(courseData);
      const lessonsData = await dispatch(fetchLessonsByCourse(id));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await dispatch(deleteLesson(lessonId, (msg) => {
          setToastMsg(msg);
          setShowToast(true);
        }));
        // Refresh lessons
        const lessonsData = await dispatch(fetchLessonsByCourse(id));
        setLessons(lessonsData);
      } catch (error) {
        console.error('Failed to delete lesson:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading lessons..." />;

  if (!course) {
    return <Alert variant="danger">Course not found</Alert>;
  }

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back to Courses
      </Button>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-success mb-2">{course.title}</h2>
              {course.category && <Badge bg="success">{course.category}</Badge>}
            </div>
            <Button
              variant="success"
              onClick={() => navigate(`/instructor-dashboard/course/${id}/create-lesson`)}
            >
              ➕ Add Lesson
            </Button>
          </div>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Course Lessons ({lessons.length})</h4>

      {lessons.length === 0 ? (
        <EmptyState
          icon="📹"
          title="No Lessons Yet"
          message="Add your first lesson to get started!"
          actionLabel="Add Lesson"
          onAction={() => navigate(`/instructor-dashboard/course/${id}/create-lesson`)}
        />
      ) : (
        <ListGroup>
          {lessons.map((lesson) => (
            <ListGroup.Item
              key={lesson._id}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Badge bg="secondary">{lesson.order}</Badge>
                  <strong>{lesson.title}</strong>
                </div>
                <p className="mb-2 text-muted">{lesson.description}</p>
                <small className="text-muted">
                  📹 Video: {lesson.videourl ? 'Uploaded' : 'Not available'}
                </small>
              </div>
              <div className="d-flex gap-2 ms-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => window.open(lesson.videourl, '_blank')}
                >
                  👁️ View Video
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteLesson(lesson._id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
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

export default ManageLessons;