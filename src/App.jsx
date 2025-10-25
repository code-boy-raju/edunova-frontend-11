

// export default App;
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/Home';
// ✅ Lazy-loaded components
const StudentSignUp = lazy(() => import('./pages/auth/Studentsignup'));
const InstructorSignUp = lazy(() => import('./pages/auth/InstructorSignup'));
const LoginPage = lazy(() => import('./pages/auth/Login'));
const OtpVerifyPage = lazy(() => import('./pages/auth/Otpverify'));
const MessageBox = lazy(() => import('./pages/Message-Box'));
const CourseList = lazy(() => import('./pages/student/CourseList'));
const CourseDetails = lazy(() => import('./pages/student/CourseDetails'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const InstructorDashboard = lazy(() => import('./pages/instructor/InstructorDashboard'));
const LessonView = lazy(() => import('./pages/student/LessonView'));
const QuizPage = lazy(() => import('./pages/student/QuizPage'));
const ResultsPage = lazy(() => import('./pages/student/ResultsPage'));
const InstructorCourses = lazy(() => import('./pages/instructor/InstructorCourses'));
const CreateCourse = lazy(() => import('./pages/instructor/CreateCourse'));
const EditCourse = lazy(() => import('./pages/instructor/EditCourse'));
const ManageLessons = lazy(() => import('./pages/instructor/ManageLessons'));
const CreateLesson = lazy(() => import('./pages/instructor/CreateLesson'));
const NotFound = lazy(() => import('./components/Notfound'));
const PurchaseHistory = lazy(() => import('./pages/student/PurchaseHistory'));
const Profile = lazy(() => import('./pages/student/Profile'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* 🏠 Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="student-signup" element={<StudentSignUp />} />
        <Route path="instructor-signup" element={<InstructorSignUp />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-otp" element={<OtpVerifyPage />} />
        <Route path="message-box" element={<MessageBox />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDetails />} />

        {/* 🎓 Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student',"guest"]}>
              <StudentDashboard/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="courses" replace />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="lesson/:id" element={<LessonView />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 🧑‍🏫 Instructor Dashboard */}
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="courses" replace />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="course/:id/lessons" element={<ManageLessons />} />
          <Route path="course/:id/create-lesson" element={<CreateLesson />} />
        </Route>

        {/* ❌ Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
