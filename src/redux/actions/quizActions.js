import API from '../../api/axiosUrl';
import {
  FETCH_QUIZ_SUCCESS,
  GENERATE_QUIZ_SUCCESS,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_FAILURE,
} from '../ActionTypes';

// Generate Quiz (AI-powered)
export const generateQuiz = (quizData, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.post('/quiz/generate', quizData);
    
    if (!data.success) {
      throw new Error(data.message || 'Quiz generation failed');
    }
    
    dispatch({ type: GENERATE_QUIZ_SUCCESS, payload: data.quiz });
    toastCallback('Quiz generated successfully!');
    return data.quiz;
  } catch (error) {
    const msg = error.response?.data?.message || error.message || 'Failed to generate quiz';
    toastCallback(msg);
    throw msg;
  }
};

// Fetch Quiz by ID
export const fetchQuiz = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_QUIZ_REQUEST });
    const { data } = await API.get(`/quiz/getquiz/${id}`);
    dispatch({ type: FETCH_QUIZ_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to fetch quiz';
    dispatch({ type: FETCH_QUIZ_FAILURE, payload: msg });
    throw msg;
  }
};

// Fetch Quizzes by Course
export const fetchQuizzesByCourse = (courseId) => async () => {
  try {
    const { data } = await API.get(`/quiz/course/${courseId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch quizzes';
  }
};

// Fetch Quizzes by Lesson
export const fetchQuizzesByLesson = (lessonId) => async () => {
  try {
    const { data } = await API.get(`/quiz/lesson/${lessonId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch quizzes';
  }
};
