
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction ,guestLogin} from '../../redux/actions/authActions';
import { Toast, ToastContainer, Spinner, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginAction(formdata, navigate, (msg) => {
      setToastMsg(msg);
      setShowToast(true);
      setLoading(false);
    }));
  };

const handleSubmitguest=()=>{
 
    dispatch(guestLogin(navigate));
}


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue your learning journey</p>
        </div>
        
        <div className="auth-body">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formdata.email}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formdata.password}
                  required
                  autoComplete="current-password"
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
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
               <Link to="/student-dashboard" onClick={handleSubmitguest} style={{ color: 'var(--primary-color)', fontWeight: 600 ,}}>
              login as Guest 
              </Link><br/>
              Don't have an account?{' '}
              <Link to="/student-signup" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                Sign up as Student
              </Link>
              {' or '}
              <Link to="/instructor-signup" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                Instructor
              </Link>
             
         
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3" style={{ marginTop: '4rem' }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg={toastMsg.includes("successful") ? "success" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastMsg.includes("successful") ? "✓ Login Success" : "✗ Login Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default LoginPage;