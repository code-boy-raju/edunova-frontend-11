// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUserResults } from '../../redux/actions/resultActions';
// import { Card, Table, Badge, Alert } from 'react-bootstrap';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function ResultsPage() {
//   const dispatch = useDispatch();
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadResults = async () => {
//       try {
//         const data = await dispatch(fetchUserResults());
//         setResults(data);
//       } catch (error) {
//         console.error('Failed to load results:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadResults();
//   }, [dispatch]);

//   if (loading) return <LoadingSpinner />;

//   const getScoreBadge = (score) => {
//     if (score >= 80) return 'success';
//     if (score >= 60) return 'warning';
//     return 'danger';
//   };

//   const getPerformance = (score) => {
//     if (score >= 80) return 'Excellent';
//     if (score >= 60) return 'Good';
//     return 'Need Improvement';
//   };

//   return (
//     <div>
//       <h2 className="mb-4">My Quiz Results 📊</h2>

//       {results.length === 0 ? (
//         <Alert variant="info">
//           You haven't taken any quizzes yet. Start learning and test your knowledge!
//         </Alert>
//       ) : (
//         <>
//           <Card className="shadow-sm mb-4">
//             <Card.Body>
//               <h5>Overview</h5>
//               <p>Total Quizzes Taken: <strong>{results.length}</strong></p>
//               <p>
//                 Average Score: <strong>
//                   {(results.reduce((acc, r) => acc + r.score, 0) / results.length).toFixed(2)}%
//                 </strong>
//               </p>
//             </Card.Body>
//           </Card>

//           <Card className="shadow-sm">
//             <Card.Body>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Quiz</th>
//                     <th>Score</th>
//                     <th>Performance</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.map((result, idx) => (
//                     <tr key={result._id}>
//                       <td>{idx + 1}</td>
//                       <td>{result.quiz?.lesson?.title || 'Quiz'}</td>
//                       <td>
//                         <Badge bg={getScoreBadge(result.score)}>
//                           {result.score.toFixed(2)}%
//                         </Badge>
//                       </td>
//                       <td>{getPerformance(result.score)}</td>
//                       <td>{new Date(result.submittedAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// export default ResultsPage;
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserResults } from '../../redux/actions/resultActions';
import { Card, Table, Badge, Alert, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

function ResultsPage() {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await dispatch(fetchUserResults());
        setResults(data);
      } catch (error) {
        console.error('Failed to load results:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [dispatch]);

  const getScoreBadge = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'primary';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getPerformance = (score) => {
    if (score >= 90) return { text: 'Excellent', emoji: '🌟' };
    if (score >= 80) return { text: 'Very Good', emoji: '🎉' };
    if (score >= 70) return { text: 'Good', emoji: '👍' };
    if (score >= 60) return { text: 'Fair', emoji: '💪' };
    return { text: 'Needs Improvement', emoji: '📚' };
  };

  if (loading) return <LoadingSpinner message="Loading your results..." />;

  if (results.length === 0) {
    return (
      <EmptyState
        icon="📊"
        title="No Quiz Results Yet"
        message="Take your first quiz to see your performance here!"
        actionLabel="Browse Courses"
        onAction={() => window.location.href = '/student-dashboard/courses'}
      />
    );
  }

  const averageScore = (results.reduce((acc, r) => acc + r.score, 0) / results.length).toFixed(2);
  const totalQuizzes = results.length;
  const passedQuizzes = results.filter(r => r.score >= 60).length;

  return (
    <div>
      <h2 className="mb-4">My Quiz Results 📊</h2>

      {/* Stats Overview */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-primary mb-0">{totalQuizzes}</h3>
              <p className="text-muted mb-0">Total Quizzes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-success mb-0">{averageScore}%</h3>
              <p className="text-muted mb-0">Average Score</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-info mb-0">{passedQuizzes}/{totalQuizzes}</h3>
              <p className="text-muted mb-0">Passed Quizzes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Results Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Quiz History</h5>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Performance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => {
                const performance = getPerformance(result.score);
                return (
                  <tr key={result._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>Quiz {idx + 1}</strong>
                      <br />
                      <small className="text-muted">
                        {result.quiz?.lesson?.title || 'Lesson Quiz'}
                      </small>
                    </td>
                    <td>
                      <Badge bg={getScoreBadge(result.score)} style={{ fontSize: '1rem' }}>
                        {result.score.toFixed(1)}%
                      </Badge>
                    </td>
                    <td>
                      <span>{performance.emoji} {performance.text}</span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultsPage;