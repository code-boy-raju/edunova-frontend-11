import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  FETCH_COURSE_DETAILS_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
} from '../ActionTypes';

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.payload, error: null };

    case FETCH_COURSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_COURSE_DETAILS_SUCCESS:
      return { ...state, currentCourse: action.payload };

    case CREATE_COURSE_SUCCESS:
      return { ...state, courses: [...state.courses, action.payload] };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(c =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(c => c._id !== action.payload),
      };

    default:
      return state;
  }
}
