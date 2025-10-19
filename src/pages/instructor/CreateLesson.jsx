// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createLesson } from '../../redux/actions/lessonActions';
// import { Card, Form, Button, ProgressBar, Alert, Toast, ToastContainer } from 'react-bootstrap';

// function CreateLesson() {
//   const { id: courseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     videoFile: null
//   });
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [toastMsg, setToastMsg] = useState('');
//   const [showToast, setShowToast] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'videoFile') {
//       setFormData({ ...formData, videoFile: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.description || !formData.videoFile) {
//       setToastMsg('All fields are required');
//       setShowToast(true);
//       return;
//     }

//     // Validate video file
//     const validTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'];
//     if (!validTypes.includes(formData.videoFile.type)) {
//       setToastMsg('Invalid video format. Use MP4, MKV, AVI, or MOV');
//       setShowToast(true);
//       return;
//     }

//     // Check file size (max 1GB)
//     const maxSize = 1 * 1024 * 1024 * 1024; // 1GB
//     if (formData.videoFile.size > maxSize) {
//       setToastMsg('Video file too large. Maximum size is 1GB');
//       setShowToast(true);
//       return;
//     }

//     setUploading(true);
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('courseId', courseId);
//     data.append('video', formData.videoFile);

//     try {
//       // Simulate upload progress
//       const progressInterval = setInterval(() => {
//         setUploadProgress(prev => {
//           if (prev >= 90) {
//             clearInterval(progressInterval);
//             return 90;
//           }
//           return prev + 10;
//         });
//       }, 500);

//       await dispatch(createLesson(data, navigate, (msg) => {
//         clearInterval(progressInterval);
//         setUploadProgress(100);
//         setToastMsg(msg);
//         setShowToast(true);
//       }));
//     } catch (error) {
//       console.error('Failed to create lesson:', error);
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   return (
//     <div>
//       <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <Card className="shadow-sm">
//         <Card.Body>
//           <h2 className="mb-4">Create New Lesson</h2>

//           {uploading && (
//             <Alert variant="info">
//               <strong>Uploading video...</strong>
//               <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-2" />
//               <small className="text-muted">This may take a few minutes depending on file size</small>
//             </Alert>
//           )}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Lesson Title *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 placeholder="e.g., Introduction to Variables"
//                 value={formData.title}
//                 onChange={handleChange}
//                 disabled={uploading}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description *</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 placeholder="Describe what this lesson covers..."
//                 value={formData.description}
//                 onChange={handleChange}
//                 disabled={uploading}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Video File * (MP4, MKV, AVI, MOV - Max 1GB)</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="videoFile"
//                 accept="video/mp4,video/mkv,video/avi,video/mov"
//                 onChange={handleChange}
//                 disabled={uploading}
//                 required
//               />
//               {formData.videoFile && (
//                 <small className="text-muted">
//                   Selected: {formData.videoFile.name} ({(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB)
//                 </small>
//               )}
//             </Form.Group>

//             <div className="d-flex gap-2">
//               <Button type="submit" variant="success" disabled={uploading}>
//                 {uploading ? 'Uploading...' : 'Create Lesson'}
//               </Button>
//               <Button variant="secondary" onClick={() => navigate(-1)} disabled={uploading}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>

//       <ToastContainer position="top-end" className="pe-2" style={{ marginTop: '4rem' }}>
//         <Toast
//           onClose={() => setShowToast(false)}
//           show={showToast}
//           delay={5000}
//           autohide
//           bg={toastMsg.includes('successfully') ? 'success' : 'danger'}
//         >
//           <Toast.Header>
//             <strong className="me-auto">Lesson Creation</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">{toastMsg}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </div>
//   );
// }

// export default CreateLesson;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createLesson } from '../../redux/actions/lessonActions';
import { Card, Form, Button, ProgressBar, Alert, Toast, ToastContainer } from 'react-bootstrap';

function CreateLesson() {
  const { id: courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'videoFile') {
      setFormData({ ...formData, videoFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.videoFile) newErrors.videoFile = 'Video file is required';
    
    if (formData.videoFile) {
      const validTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'];
      if (!validTypes.includes(formData.videoFile.type)) {
        newErrors.videoFile = 'Invalid video format. Use MP4, MKV, AVI, or MOV';
      }
      
      const maxSize = 1 * 1024 * 1024 * 1024; // 1GB
      if (formData.videoFile.size > maxSize) {
        newErrors.videoFile = 'Video file too large. Maximum size is 1GB';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToastMsg('Please fix the errors in the form');
      setShowToast(true);
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('courseId', courseId);
    data.append('video', formData.videoFile);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      await dispatch(createLesson(data, navigate, (msg) => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setToastMsg(msg);
        setShowToast(true);
      }));
    } catch (error) {
      console.error('Failed to create lesson:', error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Create New Lesson</h2>

          {uploading && (
            <Alert variant="info">
              <strong>Uploading video...</strong>
              <ProgressBar 
                now={uploadProgress} 
                label={`${uploadProgress}%`} 
                className="mt-2" 
                animated
              />
              <small className="text-muted d-block mt-2">
                This may take a few minutes depending on file size. Please don't close this page.
              </small>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Lesson Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="e.g., Introduction to Variables"
                value={formData.title}
                onChange={handleChange}
                disabled={uploading}
                isInvalid={!!errors.title}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Describe what this lesson covers..."
                value={formData.description}
                onChange={handleChange}
                disabled={uploading}
                isInvalid={!!errors.description}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video File * (MP4, MKV, AVI, MOV - Max 1GB)</Form.Label>
              <Form.Control
                type="file"
                name="videoFile"
                accept="video/mp4,video/mkv,video/avi,video/mov"
                onChange={handleChange}
                disabled={uploading}
                isInvalid={!!errors.videoFile}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.videoFile}
              </Form.Control.Feedback>
              {formData.videoFile && (
                <Form.Text className="text-success d-block mt-2">
                  ✓ Selected: {formData.videoFile.name} 
                  ({(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success" disabled={uploading}>
                {uploading ? 'Uploading...' : '✓ Create Lesson'}
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)} disabled={uploading}>
                Cancel
              </Button>
            </div>
          </Form>
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
            <strong className="me-auto">Lesson Creation</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default CreateLesson;