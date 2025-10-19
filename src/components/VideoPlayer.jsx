import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

function VideoPlayer({ videoUrl, title = "Lesson Video" }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="video-wrapper">
        <div className="video-container d-flex align-items-center justify-content-center bg-dark text-white">
          <div className="text-center p-4">
            <i className="bi bi-camera-video" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3 mb-0">No video available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-wrapper">
      {loading && !error && (
        <div className="video-container d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <Spinner animation="border" variant="light" size="lg" />
            <p className="mt-3">Loading video...</p>
          </div>
        </div>
      )}
      
      {error && (
        <Alert variant="danger" className="m-3">
          Failed to load video. Please try again later.
        </Alert>
      )}

      <div className={`video-container ${loading ? 'd-none' : ''}`}>
        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          className="w-100 h-100"
          preload="metadata"
          onLoadedData={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          style={{ objectFit: 'contain' }}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;