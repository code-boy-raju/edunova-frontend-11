import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LessonCard({ lesson, basePath = '', showActions = false, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-3 shadow-sm hover-shadow">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="secondary">{lesson.order}</Badge>
              <h5 className="mb-0">{lesson.title}</h5>
            </div>
            <p className="text-muted mb-0">{lesson.description}</p>
          </div>
          <div className="d-flex gap-2 ms-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`${basePath}/lesson/${lesson._id}`)}
            >
              View
            </Button>
            {showActions && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete && onDelete(lesson._id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LessonCard;
