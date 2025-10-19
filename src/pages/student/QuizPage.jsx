

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchQuiz } from '../../redux/actions/quizActions';
import { submitQuizResult } from '../../redux/actions/resultActions';
import { Button, Alert, ProgressBar, Modal, Badge } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Load quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizData = await dispatch(fetchQuiz(id));
        setQuiz(quizData);
        // Set timer based on number of questions (2 minutes per question)
        const totalTime = (quizData.questions?.length || 5) * 120;
        setTimeLeft(totalTime);
      } catch (error) {
        console.error('Failed to load quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id, dispatch]);

  // Timer countdown
  useEffect(() => {
    if (!quizStarted || quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished]);

  const handleTimeUp = () => {
    setShowTimeUpModal(true);
    setTimeout(() => {
      setShowTimeUpModal(false);
      handleSubmit(true);
    }, 2000);
  };

  const handleAnswerSelect = (questionIndex, choiceIndex) => {
    if (quizFinished) return;
    setAnswers({
      ...answers,
      [questionIndex]: choiceIndex
    });
  };

  const calculateResults = useCallback(() => {
    let correct = 0;
    const detailedResults = quiz.questions.map((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === q.answerIndex;
      if (isCorrect) correct++;
      
      return {
        question: q.question,
        choices: q.choices,
        userAnswer: userAnswer,
        correctAnswer: q.answerIndex,
        isCorrect: isCorrect
      };
    });

    const totalQuestions = quiz.questions.length;
    const percentage = (correct / totalQuestions) * 100;

    return {
      score: percentage,
      correct: correct,
      total: totalQuestions,
      details: detailedResults,
      timeTaken: ((quiz.questions.length * 120) - timeLeft)
    };
  }, [quiz, answers, timeLeft]);

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit) {
      const unanswered = quiz.questions.length - Object.keys(answers).length;
      if (unanswered > 0) {
        if (!window.confirm(`You have ${unanswered} unanswered questions. Submit anyway?`)) {
          return;
        }
      }
    }

    setQuizFinished(true);
    const calculatedResults = calculateResults();
    setResults(calculatedResults);

    // Submit to backend
    const resultData = {
      quizId: quiz._id,
      responses: calculatedResults.details.map((detail, idx) => ({
        questionIndex: idx,
        selectedAnswer: detail.userAnswer ?? -1,
        correctAnswer: detail.correctAnswer
      })),
      score: calculatedResults.score
    };

    try {
      await dispatch(submitQuizResult(resultData, () => {}, () => {}));
    } catch (error) {
      console.error('Failed to submit results:', error);
    }

    // Show results immediately
    setShowResults(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 120) return 'success';
    if (timeLeft > 60) return 'warning';
    return 'danger';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return { text: 'Outstanding! 🌟', variant: 'success' };
    if (score >= 80) return { text: 'Excellent Work! 🎉', variant: 'success' };
    if (score >= 70) return { text: 'Good Job! 👍', variant: 'info' };
    if (score >= 60) return { text: 'Nice Try! 💪', variant: 'warning' };
    return { text: 'Keep Practicing! 📚', variant: 'danger' };
  };

  if (loading) return <LoadingSpinner />;

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="quiz-container">
        <Alert variant="warning">
          <Alert.Heading>No Quiz Available</Alert.Heading>
          <p>This quiz doesn't have any questions yet. Please try again later.</p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Alert>
      </div>
    );
  }

  // Show Results View
  if (showResults && results) {
    const performance = getPerformanceMessage(results.score);
    
    return (
      <div className="results-container fade-in">
        <div className={`results-header bg-${performance.variant}`}>
          <h2>Quiz Results</h2>
          <div className="results-score">{results.score.toFixed(1)}%</div>
          <h4>{performance.text}</h4>
          <p className="mb-0">
            {results.correct} out of {results.total} correct
          </p>
        </div>

        <div className="results-body">
          <div className="result-stat">
            <strong>Score:</strong>
            <span className={`text-${performance.variant}`}>
              {results.score.toFixed(1)}%
            </span>
          </div>
          <div className="result-stat">
            <strong>Correct Answers:</strong>
            <span className="text-success">{results.correct}</span>
          </div>
          <div className="result-stat">
            <strong>Incorrect Answers:</strong>
            <span className="text-danger">{results.total - results.correct}</span>
          </div>
          <div className="result-stat">
            <strong>Time Taken:</strong>
            <span>{formatTime(results.timeTaken)}</span>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">Answer Review:</h5>
         
{results.details.map((detail, idx) => {
  const wasSkipped = detail.userAnswer === undefined;

  return (
    <div key={idx} className="question-card mb-3">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className="question-number">Question {idx + 1}</span>
        {detail.isCorrect ? (
          <Badge bg="success">✓ Correct</Badge>
        ) : (
          <Badge bg="danger">✗ Incorrect</Badge>
        )}
      </div>

      <p className="question-text">{detail.question}</p>

      <div className="choices-review">
        {detail.choices.map((choice, choiceIdx) => {
          const isUserAnswer = detail.userAnswer === choiceIdx;
          const isCorrectAnswer = detail.correctAnswer === choiceIdx;

          let className = 'choice-btn';
          if (isCorrectAnswer) {
            className += ' correct';
          } else if (isUserAnswer && !isCorrectAnswer) {
            className += ' incorrect';
          }

          return (
            <button
              key={choiceIdx}
              className={className}
              disabled
            >
              <span className="choice-letter">
                {String.fromCharCode(65 + choiceIdx)}
              </span>
              <span className="flex-grow-1">{choice}</span>
              {isCorrectAnswer && (
                <span className="badge bg-success ms-2">Correct</span>
              )}
              {isUserAnswer && !isCorrectAnswer && (
                <span className="badge bg-danger ms-2">Your Answer</span>
              )}
            </button>
          );
        })}

        {wasSkipped && (
          <Alert variant="warning" className="mt-2 mb-0">
            You didn't answer this question
          </Alert>
        )}
      </div>
    </div>
  );
})}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/student-dashboard/results')}
              className="me-2"
            >
              View All Results
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/student-dashboard/courses')}
            >
              Back to Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Ready to Start?</h2>
          <p className="mb-0">
            This quiz has {quiz.questions.length} questions
          </p>
          <div className="quiz-timer mt-3">
            <div>
              <strong>Time Limit:</strong> {formatTime(timeLeft)}
            </div>
            <div>
              <strong>Questions:</strong> {quiz.questions.length}
            </div>
          </div>
        </div>

        <div className="quiz-body">
          <Alert variant="info">
            <h5>Instructions:</h5>
            <ul className="mb-0">
              <li>You have {Math.floor(timeLeft / 60)} minutes to complete this quiz</li>
              <li>Each question has 4 options with only one correct answer</li>
              <li>You can navigate between questions before submitting</li>
              <li>Results will be shown immediately after submission</li>
              <li>The quiz will auto-submit when time runs out</li>
            </ul>
          </Alert>

          <div className="text-center mt-4">
            <Button
              variant="success"
              size="lg"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              className="ms-3"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Taking View
  const progress = (Object.keys(answers).length / quiz.questions.length) * 100;

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Quiz in Progress</h2>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate(-1)}
          >
            ← Exit
          </Button>
        </div>
        
        <div className="quiz-timer">
          <div>
            <div className="text-muted small">Time Remaining</div>
            <div className={`timer-display ${timeLeft <= 60 ? 'timer-warning' : ''}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          <div>
            <div className="text-muted small">Progress</div>
            <div className="timer-display">
              {Object.keys(answers).length}/{quiz.questions.length}
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-body">
        <ProgressBar 
          now={progress} 
          variant={getTimeColor()}
          label={`${Object.keys(answers).length}/${quiz.questions.length} answered`}
          className="mb-4"
          style={{ height: '24px', fontSize: '14px' }}
        />

        {quiz.questions.map((question, idx) => (
          <div key={idx} className="question-card fade-in">
            <span className="question-number">Question {idx + 1}</span>
            <p className="question-text">{question.question}</p>
            
            <div>
              {question.choices.map((choice, choiceIdx) => (
                <button
                  key={choiceIdx}
                  className={`choice-btn ${answers[idx] === choiceIdx ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(idx, choiceIdx)}
                >
                  <span className="choice-letter">
                    {String.fromCharCode(65 + choiceIdx)}
                  </span>
                  <span className="flex-grow-1">{choice}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <Button
            variant="success"
            size="lg"
            onClick={() => handleSubmit(false)}
          >
            Submit Quiz
          </Button>
        </div>
      </div>

      {/* Time Up Modal */}
      <Modal show={showTimeUpModal} centered backdrop="static">
        <Modal.Body className="text-center p-5">
          <div style={{ fontSize: '4rem' }}>⏰</div>
          <h3 className="mt-3">Time's Up!</h3>
          <p>Submitting your answers...</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuizPage;