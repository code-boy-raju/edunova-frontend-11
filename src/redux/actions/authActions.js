// // import API from "../../api/axiosUrl";
// // import {
// //   AUTH_REQUEST,
// //   AUTH_SUCCESS,
// //   AUTH_FAILURE,
// //   LOGIN_SUCCESS,
// //   LOGOUT,
// // } from "../ActionTypes";


// // // STUDENT SIGNUP
// // export const studentSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
// //   try {
// //       dispatch({ type: AUTH_REQUEST });
// //       const { data } = await API.post("/user/studentSignup", formData);
// //       dispatch({ type: AUTH_SUCCESS, payload: data.message });
// //       toastCallback(data.message);
// //     navigate(`/verify-otp?userId=${data.userId}`);
// //   } catch (error) {
// //     const msg = error.response?.data?.message || "Signup failed";
// //     dispatch({ type: AUTH_FAILURE, payload: msg });
// //     toastCallback(msg);
// //   }
// // };

// // // VERIFY OTP
// // export const verifyStudentOtp = (formData, navigate, toastCallback) => async (dispatch) => {
// //   try {
// //       dispatch({ type: AUTH_REQUEST });
// //       const { data } = await API.post("/user/verifyotp", formData);
// //     dispatch({ type: AUTH_SUCCESS, payload: data.message });
// //     toastCallback(data.message);
// //     navigate("/login");
// //   } catch (error) {
// //     const msg = error.response?.data?.message || "OTP verification failed";
// //     dispatch({ type: AUTH_FAILURE, payload: msg });
// //     toastCallback(msg);
// //   }
// // };

// // // INSTRUCTOR SIGNUP
// // export const instructorSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
// //   try {
// //     dispatch({ type: AUTH_REQUEST });
// //     const { data } = await API.post("/user/instructorSignup", formData, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     });
// //     dispatch({ type: AUTH_SUCCESS, payload: data.message });
// //     toastCallback(data.message);
// //     navigate("/message-box");
// //   } catch (error) {
// //     const msg = error.response?.data?.message || "Instructor Signup failed";
// //     dispatch({ type: AUTH_FAILURE, payload: msg });
// //     toastCallback(msg);
// //   }
// // };

// // // LOGIN
// // export const loginAction = (formData, navigate, toastCallback) => async (dispatch) => {
// //   try {
// //     dispatch({ type: AUTH_REQUEST });
// //     const { data } = await API.post("/user/login", formData);
    
// //     dispatch({ type: LOGIN_SUCCESS, payload: data.user });
// //     localStorage.setItem("token", data.token);
// //     toastCallback(data.message);
// //     if (data.user.role==="student"){
// //         navigate("/student-dashboard");
// //     }else{
// //     navigate("/instructor-dashboard")
// //     }
// //   } catch (error) {
// //     const msg = error.response?.data?.message || "Login failed";
// //     dispatch({ type: AUTH_FAILURE, payload: msg });
// //     toastCallback(msg);
// //   }
// // };

// // // LOGOUT
// // export const logout = () => (dispatch) => {
// //   localStorage.removeItem("token");
// //   dispatch({ type: LOGOUT });
// // };

// import API from "../../api/axiosUrl";
// import {
//   AUTH_REQUEST,
//   AUTH_SUCCESS,
//   AUTH_FAILURE,
//   LOGIN_SUCCESS,
//   LOGOUT,
// } from "../ActionTypes";

// // STUDENT SIGNUP
// export const studentSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
//   try {
//     dispatch({ type: AUTH_REQUEST });
//     const { data } = await API.post("/user/studentSignup", formData);
//     dispatch({ type: AUTH_SUCCESS, payload: data.message });
//     toastCallback(data.message);
//     navigate(`/verify-otp?userId=${data.userId}`);
//   } catch (error) {
//     const msg = error.response?.data?.message || "Signup failed";
//     dispatch({ type: AUTH_FAILURE, payload: msg });
//     toastCallback(msg);
//   }
// };

// // VERIFY OTP
// export const verifyStudentOtp = (formData, navigate, toastCallback) => async (dispatch) => {
//   try {
//     dispatch({ type: AUTH_REQUEST });
//     const { data } = await API.post("/user/verifyotp", formData);
//     dispatch({ type: AUTH_SUCCESS, payload: data.message });
//     toastCallback(data.message);
//     navigate("/login");
//   } catch (error) {
//     const msg = error.response?.data?.message || "OTP verification failed";
//     dispatch({ type: AUTH_FAILURE, payload: msg });
//     toastCallback(msg);
//   }
// };

// // INSTRUCTOR SIGNUP
// export const instructorSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
//   try {
//     dispatch({ type: AUTH_REQUEST });
//     const { data } = await API.post("/user/instructorSignup", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     dispatch({ type: AUTH_SUCCESS, payload: data.message });
//     toastCallback(data.message);
//     navigate("/message-box");
//   } catch (error) {
//     const msg = error.response?.data?.message || "Instructor Signup failed";
//     dispatch({ type: AUTH_FAILURE, payload: msg });
//     toastCallback(msg);
//   }
// };

// // LOGIN
// export const loginAction = (formData, navigate, toastCallback) => async (dispatch) => {
//   try {
//     dispatch({ type: AUTH_REQUEST });
//     const { data } = await API.post("/user/login", formData);
    
//     dispatch({ type: LOGIN_SUCCESS, payload: data.user });
//     localStorage.setItem("token", data.token);
//     toastCallback(data.message);
    
//     if (data.user.role === "student") {
//       navigate("/student-dashboard");
//     } else {
//       navigate("/instructor-dashboard");
//     }
//   } catch (error) {
//     const msg = error.response?.data?.message || "Login failed";
//     dispatch({ type: AUTH_FAILURE, payload: msg });
//     toastCallback(msg);
//   }
// };

// // LOGOUT
// export const logout = () => (dispatch) => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   dispatch({ type: LOGOUT });
// };
import API from "../../api/axiosUrl";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../ActionTypes";

// STUDENT SIGNUP
export const studentSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const { data } = await API.post("/user/studentSignup", formData);
    dispatch({ type: AUTH_SUCCESS, payload: data.message });
    toastCallback(data.message);
    navigate(`/verify-otp?userId=${data.userId}`);
  } catch (error) {
    const msg = error.response?.data?.message || "Signup failed";
    dispatch({ type: AUTH_FAILURE, payload: msg });
    toastCallback(msg);
  }
};

// VERIFY OTP
export const verifyStudentOtp = (formData, navigate, toastCallback) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const { data } = await API.post("/user/verifyotp", formData);
    dispatch({ type: AUTH_SUCCESS, payload: data.message });
    toastCallback(data.message);
    navigate("/login");
  } catch (error) {
    const msg = error.response?.data?.message || "OTP verification failed";
    dispatch({ type: AUTH_FAILURE, payload: msg });
    toastCallback(msg);
  }
};

// INSTRUCTOR SIGNUP
export const instructorSignUp = (formData, navigate, toastCallback) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const { data } = await API.post("/user/instructorSignup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: AUTH_SUCCESS, payload: data.message });
    toastCallback(data.message);
    navigate("/message-box");
  } catch (error) {
    const msg = error.response?.data?.message || "Instructor Signup failed";
    dispatch({ type: AUTH_FAILURE, payload: msg });
    toastCallback(msg);
  }
};

// LOGIN
export const loginAction = (formData , navigate, toastCallback) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const { data } = await API.post("/user/login", formData);
    
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem("token", data.token);
    toastCallback(data.message);
    
    if (data.user.role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/instructor-dashboard");
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Login failed";
    dispatch({ type: AUTH_FAILURE, payload: msg });
    toastCallback(msg);
  }
};

// GUEST LOGIN
export const guestLogin = (navigate) => (dispatch) => {
  const guestUser = {
    username: "Student",
    email: "guest@edunova.com",
    role: "guest",
  };

  // Save user data locally
  localStorage.setItem("user", JSON.stringify(guestUser));

  // Dispatch to Redux
  dispatch({ type: LOGIN_SUCCESS, payload: guestUser });

  // Navigate to dashboard
  navigate("/student-dashboard");
};


// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};