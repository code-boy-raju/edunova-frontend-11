// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { studentSignUp } from '../../redux/actions/authActions';
// import { Toast, ToastContainer, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';


// function StudentSignUp() {
//   const [formdata, setFormdata] = useState({ username: "", email: "", password: "" });
//   const [toastMsg, setToastMsg] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const { loading } = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(studentSignUp(formdata, navigate, (msg) => {
//       setToastMsg(msg);
//       setShowToast(true);
//     }));
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="form-title">Student Signup</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? <Spinner size="sm" animation="border" /> : "Signup"}
//         </button>
//       </form>

//       <ToastContainer position="top-end" className="pe-2" style={{ marginTop: "4rem" }}>
//         <Toast
//           onClose={() => setShowToast(false)}
//           show={showToast}
//           delay={5000}
//           autohide
//           bg={toastMsg.includes("successful") ? "success" : "danger"}
//         >
//           <Toast.Header>
//             <strong className="me-auto">
//               {toastMsg.includes("successful") ? "Signup Success" : "Signup Error"}
//             </strong>
//           </Toast.Header>
//           <Toast.Body>{toastMsg}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </div>
//   );
// }

// export default StudentSignUp
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentSignUp } from '../../redux/actions/authActions';
import { Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function StudentSignUp() {
  const [formdata, setFormdata] = useState({ username: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formdata.password.length < 6) {
      setToastMsg("Password must be at least 6 characters");
      setShowToast(true);
      return;
    }
    
    if (formdata.password !== confirmPassword) {
      setToastMsg("Passwords do not match");
      setShowToast(true);
      return;
    }

    dispatch(studentSignUp(formdata, navigate, (msg) => {
      setToastMsg(msg);
      setShowToast(true);
    }));
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return { text: '', color: '' };
    if (password.length < 6) return { text: 'Weak', color: 'danger' };
    if (password.length < 10) return { text: 'Medium', color: 'warning' };
    return { text: 'Strong', color: 'success' };
  };

  const strength = passwordStrength(formdata.password);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Student Account</h2>
          <p>Start your learning journey today</p>
        </div>
        
        <div className="auth-body">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your full name"
                onChange={handleChange}
                value={formdata.username}
                required
                minLength={3}
              />
            </div>

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
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  value={formdata.password}
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
              {formdata.password && (
                <small className={`text-${strength.color} d-block mt-1`}>
                  Password strength: {strength.text}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              {confirmPassword && formdata.password !== confirmPassword && (
                <small className="text-danger d-block mt-1">
                  Passwords don't match
                </small>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Creating account...
                </>
              ) : (
                'Create Account'
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
              {toastMsg.includes("successful") ? "✓ Signup Success" : "✗ Signup Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default StudentSignUp;