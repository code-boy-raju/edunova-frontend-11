
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentSignUp from './pages/auth/Studentsignup';
import InstructorSignUp from './pages/auth/InstructorSignup';
import LoginPage from './pages/auth/Login';
import OtpVerifyPage from './pages/auth/Otpverify';
import MessageBox from './pages/Message-Box';
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CourseList from './pages/student/CourseList';
import CourseDetails from './pages/student/CourseDetails';
import LessonView from './pages/student/LessonView';
import QuizPage from './pages/student/QuizPage';
import ResultsPage from './pages/student/ResultsPage';
import InstructorCourses from './pages/instructor/InstructorCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import EditCourse from './pages/instructor/EditCourse';
import ManageLessons from './pages/instructor/ManageLessons';
import CreateLesson from './pages/instructor/CreateLesson';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/Home';
import NotFound from './components/Notfound';
function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <Routes>
      {/* welcome page//main page */}
      <Route path="/" element={<WelcomePage/>}/>
      {/* Auth routes */}
        <Route path="student-signup" element={<StudentSignUp />} />
        <Route path="instructor-signup" element={<InstructorSignUp />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-otp" element={<OtpVerifyPage />} />
        <Route path="message-box" element={<MessageBox />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDetails />} />

      {/* Student Routes */}
      <Route path="/student-dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="lesson/:id" element={<LessonView />} />
        <Route path="quiz/:id" element={<QuizPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>

      {/* Instructor Routes */}
      <Route path="/instructor-dashboard" element={
        <ProtectedRoute allowedRoles={['instructor']}>
          <InstructorDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="edit-course/:id" element={<EditCourse />} />
        <Route path="course/:id/lessons" element={<ManageLessons />} />
        <Route path="course/:id/create-lesson" element={<CreateLesson />} />
      </Route>

      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}


export default App;