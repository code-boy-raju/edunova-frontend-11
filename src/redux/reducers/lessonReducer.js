import {
  FETCH_LESSONS_SUCCESS,
  CREATE_LESSON_SUCCESS,
  DELETE_LESSON_SUCCESS,
} from '../ActionTypes';

const initialState = {
  lessons: [],
  currentLesson: null,
};

export default function lessonReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LESSONS_SUCCESS:
      return { ...state, lessons: action.payload };

    case CREATE_LESSON_SUCCESS:
      return { ...state, lessons: [...state.lessons, action.payload] };

    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(l => l._id !== action.payload),
      };

    default:
      return state;
  }
}