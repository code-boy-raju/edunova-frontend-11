import React from 'react';
import { Badge } from 'react-bootstrap';

function QuizQuestion({ 
  question, 
  index, 
  selectedAnswer, 
  onAnswerSelect, 
  showResults = false, 
  correctAnswer 
}) {
  return (
    <div className="question-card fade-in">
      <span className="question-number">Question {index + 1}</span>
      <p className="question-text">{question.question}</p>
      <div>
        {question.choices.map((choice, i) => {
          let className = 'choice-btn';
          
          if (showResults) {
            if (i === correctAnswer) {
              className += ' correct';
            } else if (i === selectedAnswer && i !== correctAnswer) {
              className += ' incorrect';
            }
          } else if (selectedAnswer === i) {
            className += ' selected';
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => !showResults && onAnswerSelect(index, i)}
              disabled={showResults}
            >
              <span className="choice-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-grow-1">{choice}</span>
              {showResults && i === correctAnswer && (
                <Badge bg="success" className="ms-2">✓ Correct</Badge>
              )}
              {showResults && i === selectedAnswer && i !== correctAnswer && (
                <Badge bg="danger" className="ms-2">✗ Your Answer</Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizQuestion;