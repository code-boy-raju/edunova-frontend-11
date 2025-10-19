import API from '../../api/axiosUrl';
import {
  FETCH_RESULTS_SUCCESS,
  SUBMIT_RESULT_SUCCESS,
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_FAILURE,
} from '../ActionTypes';

// Submit Quiz Result
export const submitQuizResult = (resultData, navigate, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.post('/result/submit', resultData);
    dispatch({ type: SUBMIT_RESULT_SUCCESS, payload: data });
    toastCallback(`Quiz submitted! Score: ${resultData.score.toFixed(1)}%`);
    // Don't navigate - we show results immediately in QuizPage
    return data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to submit result';
    toastCallback(msg);
    throw msg;
  }
};

// Fetch User Results
export const fetchUserResults = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RESULTS_REQUEST });
    const { data } = await API.get('/result/getresults');
    dispatch({ type: FETCH_RESULTS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to fetch results';
    dispatch({ type: FETCH_RESULTS_FAILURE, payload: msg });
    throw msg;
  }
};

// Fetch Results by Quiz
export const fetchResultsByQuiz = (quizId) => async () => {
  try {
    const { data } = await API.get(`/result/quiz/${quizId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch quiz results';
  }
};

// Fetch Single Result
export const fetchResultDetails = (id) => async () => {
  try {
    const { data } = await API.get(`/result/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch result details';
  }
};