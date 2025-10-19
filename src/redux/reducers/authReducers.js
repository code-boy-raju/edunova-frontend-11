import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };

    case AUTH_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload, error: null };

    case AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };

    case LOGOUT:
      return { ...state, user: null, successMessage: null };

    default:
      return state;
  }
}
