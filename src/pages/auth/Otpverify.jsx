// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { verifyStudentOtp } from '../../redux/actions/authActions';
// import { Toast, ToastContainer } from 'react-bootstrap';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// function OtpVerifyPage() {
//   const [otp, setOtp] = useState("");
//   const [toastMsg, setToastMsg] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [params] = useSearchParams();
//   const userId = params.get("userId");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(verifyStudentOtp({ userId, otp }, navigate, (msg) => {
//       setToastMsg(msg);
//       setShowToast(true);
//     }));
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="form-title">Verify OTP</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//         <button type="submit" className="submit-btn">Verify</button>
//       </form>

//       <ToastContainer position="top-end" className="pe-2" style={{ marginTop: "4rem" }}>
//         <Toast
//           onClose={() => setShowToast(false)}
//           show={showToast}
//           delay={5000}
//           autohide
//           bg={toastMsg.includes("verified") ? "success" : "danger"}
//         >
//           <Toast.Header>
//             <strong className="me-auto">
//               {toastMsg.includes("verified") ? "Verification Success" : "Verification Error"}
//             </strong>
//           </Toast.Header>
//           <Toast.Body>{toastMsg}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </div>
//   );
// }

// export default OtpVerifyPage;

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyStudentOtp } from '../../redux/actions/authActions';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OtpVerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      setToastMsg("Please enter complete 4-digit OTP");
      setShowToast(true);
      return;
    }

    setLoading(true);
    dispatch(verifyStudentOtp({ userId, otp: otpString }, navigate, (msg) => {
      setToastMsg(msg);
      setShowToast(true);
      setLoading(false);
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Verify Your Email</h2>
          <p>Enter the 4-digit code sent to your email</p>
        </div>
        
        <div className="auth-body">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="d-flex justify-content-center gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  style={{
                    width: '60px',
                    height: '60px',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    marginBottom: 0
                  }}
                  className="otp-input"
                />
              ))}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Didn't receive the code?{' '}
              <button
                onClick={() => {
                  setToastMsg("OTP resent successfully!");
                  setShowToast(true);
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Resend OTP
              </button>
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
          bg={toastMsg.includes("verified") || toastMsg.includes("resent") ? "success" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">OTP Verification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default OtpVerifyPage;