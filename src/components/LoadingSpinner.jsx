import React from 'react';

function LoadingSpinner({ message = 'Loading...', fullScreen = false }) {
  if (fullScreen) {
    return (
      <div 
        className="loading-container" 
        style={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className="loading-spinner"></div>
        <p className="text-muted mt-3">{message}</p>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="text-muted mt-3">{message}</p>
    </div>
  );
}

export default LoadingSpinner;