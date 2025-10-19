import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLessonDetails } from '../../redux/actions/lessonActions';
import { generateQuiz } from '../../redux/actions/quizActions';
import { Card, Button, Alert, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import VideoPlayer from '../../components/VideoPlayer';
import LoadingSpinner from '../../components/LoadingSpinner';

function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonData = await dispatch(fetchLessonDetails(id));
        setLesson(lessonData);
      } catch (error) {
        console.error('Failed to load lesson:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id, dispatch]);

  const handleGenerateQuiz = async () => {
    setGeneratingQuiz(true);
    try {
      const quiz = await dispatch(generateQuiz({
        courseId: lesson.course,
        lessonId: lesson._id,
        numQuestions: 5
      }, (msg) => {
        setToastMsg(msg);
        setShowToast(true);
      }));
      
      // Navigate to quiz page
      navigate(`/student-dashboard/quiz/${quiz._id}`);
    } catch (error) {
      console.error('Quiz generation failed:', error);
      setGeneratingQuiz(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading lesson..." />;

  if (!lesson) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Lesson Not Found</Alert.Heading>
        <p>The lesson you're looking for doesn't exist.</p>
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back to Course
      </Button>

      {/* Lesson Header */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h2 className="text-success mb-3">{lesson.title}</h2>
          <p className="text-muted mb-0">{lesson.description}</p>
        </Card.Body>
      </Card>

      {/* Video Player */}
      <Card className="shadow-sm mb-4">
        <Card.Body className="p-0">
          <VideoPlayer videoUrl={lesson.videourl} title={lesson.title} />
        </Card.Body>
      </Card>

      {/* Quiz Section */}
      <Card className="shadow-sm">
        <Card.Body className="text-center p-5">
          <div style={{ fontSize: '4rem' }} className="mb-3">🎯</div>
          <h4 className="mb-3">Ready to Test Your Knowledge?</h4>
          <p className="text-muted mb-4">
            Take an AI-generated quiz to reinforce what you've learned in this lesson.
          </p>
          <Button
            variant="success"
            size="lg"
            onClick={handleGenerateQuiz}
            disabled={generatingQuiz}
            className="px-5"
          >
            {generatingQuiz ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Generating Quiz...
              </>
            ) : (
              <>🎯 Take Quiz</>
            )}
          </Button>
          {generatingQuiz && (
            <p className="text-muted small mt-3 mb-0">
              This may take a few seconds...
            </p>
          )}
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3" style={{ marginTop: '4rem' }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg={toastMsg.includes('successfully') ? 'success' : 'danger'}
        >
          <Toast.Header>
            <strong className="me-auto">Quiz Generation</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default LessonView;