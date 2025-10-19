import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course, basePath = '' }) {
  const navigate = useNavigate();

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  const handleClick = () => {
    navigate(`${basePath}/course/${course._id}`);
  };

  return (
    <Card 
      className="course-card shadow-sm h-100" 
      onClick={handleClick} 
      style={{ cursor: 'pointer', overflow: 'hidden' }}
    >
      <div 
        className="course-thumbnail" 
        style={{ background: randomGradient }}
      >
        <span style={{ fontSize: '4rem' }}>📚</span>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-truncate mb-2">
          {course.title}
        </Card.Title>
        
        {course.category && (
          <Badge 
            bg="success" 
            className="mb-3 align-self-start"
            style={{ fontSize: '0.75rem' }}
          >
            {course.category}
          </Badge>
        )}
        
        <Card.Text 
          className="text-muted flex-grow-1" 
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.9rem'
          }}
        >
          {course.description || 'No description available'}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
          <small className="text-muted">
            📖 {course.lessons?.length || 0} lessons
          </small>
          <small className="text-muted">
            👤 {course.createdBy?.username || 'Unknown'}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
