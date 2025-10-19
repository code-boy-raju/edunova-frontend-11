import API from '../../api/axiosUrl';
import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  FETCH_COURSE_DETAILS_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
} from '../ActionTypes';

// Fetch All Courses
export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COURSES_REQUEST });
    const { data } = await API.get('/course/allcourse');
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: FETCH_COURSES_FAILURE, 
      payload: error.response?.data?.message || 'Failed to fetch courses' 
    });
  }
};

// Fetch Single Course
export const fetchCourseDetails = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/course/onecourse/${id}`);
    dispatch({ type: FETCH_COURSE_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch course details';
  }
};

// Create Course (Instructor)
export const createCourse = (courseData, navigate, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.post('/course/postcourse', courseData);
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: data });
    toastCallback('Course created successfully!');
    navigate('/instructor-dashboard/courses');
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to create course';
    toastCallback(msg);
    throw msg;
  }
};

// Update Course (Instructor)
export const updateCourse = (id, courseData, navigate, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.put(`/course/updatecourse/${id}`, courseData);
    dispatch({ type: UPDATE_COURSE_SUCCESS, payload: data });
    toastCallback('Course updated successfully!');
    navigate('/instructor-dashboard/courses');
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to update course';
    toastCallback(msg);
    throw msg;
  }
};

// Delete Course (Instructor)
export const deleteCourse = (id, toastCallback) => async (dispatch) => {
  try {
    await API.delete(`/course/deletecourse/${id}`);
    dispatch({ type: DELETE_COURSE_SUCCESS, payload: id });
    toastCallback('Course deleted successfully!');
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to delete course';
    toastCallback(msg);
    throw msg;
  }
};