import {
  FETCH_RESULTS_SUCCESS,
  SUBMIT_RESULT_SUCCESS,
} from '../ActionTypes';

const initialState = {
  results: [],
  currentResult: null,
};

export default function resultReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESULTS_SUCCESS:
      return { ...state, results: action.payload };

    case SUBMIT_RESULT_SUCCESS:
      return { 
        ...state, 
        currentResult: action.payload,
        results: [...state.results, action.payload] 
      };

    default:
      return state;
  }
}