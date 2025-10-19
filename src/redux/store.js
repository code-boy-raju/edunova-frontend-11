import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducers";
import courseReducer from "./reducers/courseReducer";
import lessonReducer from "./reducers/lessonReducer";
import quizReducer from "./reducers/quizReducer";
import resultReducer from "./reducers/resultReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  lessons: lessonReducer,
  quizzes: quizReducer,
  results: resultReducer,
});

// Load user from localStorage on app start
const loadAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      return {
        auth: {
          user: JSON.parse(userStr),
          loading: false,
          error: null,
          successMessage: null,
        }
      };
    }
  } catch (e) {
    console.error('Failed to load auth state:', e);
  }
  return undefined;
};

export const store = legacy_createStore(
  rootReducer,
  loadAuthState(),
  applyMiddleware(thunk)
);

// Save user to localStorage on auth changes
store.subscribe(() => {
  const state = store.getState();
  if (state.auth.user) {
    localStorage.setItem('user', JSON.stringify(state.auth.user));
  } else {
    localStorage.removeItem('user');
  }
});