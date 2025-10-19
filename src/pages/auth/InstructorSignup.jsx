// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instructorSignUp } from "../../redux/actions/authActions";
import { Toast, ToastContainer, Spinner, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
function InstructorSignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData({ ...formData, file });
      
      // Create preview for images
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      setToastMsg("Name must be at least 3 characters");
      setShowToast(true);
      return false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setToastMsg("Please enter a valid email");
      setShowToast(true);
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setToastMsg("Password must be at least 6 characters");
      setShowToast(true);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setToastMsg("Passwords do not match");
      setShowToast(true);
      return false;
    }

    if (!formData.file) {
      setToastMsg("Please upload an identity document");
      setShowToast(true);
      return false;
    }

    // Validate file size (max 10MB)
    if (formData.file.size > 10 * 1024 * 1024) {
      setToastMsg("File size must be less than 10MB");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("file", formData.file);

    dispatch(
      instructorSignUp(data, navigate, (msg) => {
        setToastMsg(msg);
        setShowToast(true);
      })
    );
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return { text: '', color: '' };
    if (password.length < 6) return { text: 'Weak', color: 'danger' };
    if (password.length < 10) return { text: 'Medium', color: 'warning' };
    return { text: 'Strong', color: 'success' };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Become an Instructor</h2>
          <p>Share your knowledge and inspire students worldwide</p>
        </div>

        <div className="auth-body">
          <Alert variant="info" className="mb-4">
            <small>
              <strong>📋 Requirements:</strong>
              <ul className="mb-0 mt-2" style={{ fontSize: '0.9rem' }}>
                <li>Valid government-issued ID or teaching certificate</li>
                <li>Professional profile information</li>
                <li>Admin approval required (usually within 24-48 hours)</li>
              </ul>
            </small>
          </Alert>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Full Name *</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <small className={`text-${strength.color} d-block mt-1`}>
                  Password strength: {strength.text}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <small className="text-danger d-block mt-1">
                  Passwords don't match
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="file">
                Identity Document * (ID, Passport, Teaching Certificate)
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                required
              />
              <small className="text-muted d-block mt-1">
                Accepted formats: JPG, PNG, PDF (Max 10MB)
              </small>
              
              {filePreview && (
                <div className="mt-3">
                  <img 
                    src={filePreview} 
                    alt="Document preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0'
                    }} 
                  />
                </div>
              )}
              
              {formData.file && !filePreview && (
                <div className="mt-2 p-3 bg-light rounded">
                  <small>
                    📄 {formData.file.name} ({(formData.file.size / 1024).toFixed(2)} KB)
                  </small>
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Submitting application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3" style={{ marginTop: "4rem" }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg={toastMsg.toLowerCase().includes("success") ? "success" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastMsg.toLowerCase().includes("success") ? "✓ Success" : "✗ Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default InstructorSignUp;