import React from 'react';
import { Card, Button } from 'react-bootstrap';

function EmptyState({ 
  icon = '📭', 
  title = 'No items found', 
  message = 'Get started by creating your first item',
  actionLabel,
  onAction 
}) {
  return (
    <Card className="text-center p-5 border-0 shadow-sm">
      <Card.Body>
        <div style={{ fontSize: '4rem' }} className="mb-3">{icon}</div>
        <h4 className="mb-3">{title}</h4>
        <p className="text-muted mb-4">{message}</p>
        {actionLabel && onAction && (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default EmptyState;