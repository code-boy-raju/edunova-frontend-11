import {
  FETCH_QUIZ_SUCCESS,
  GENERATE_QUIZ_SUCCESS,
} from '../ActionTypes';

const initialState = {
  currentQuiz: null,
  quizzes: [],
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZ_SUCCESS:
      return { ...state, currentQuiz: action.payload };

    case GENERATE_QUIZ_SUCCESS:
      return { 
        ...state, 
        currentQuiz: action.payload,
        quizzes: [...state.quizzes, action.payload] 
      };

    default:
      return state;
  }
}