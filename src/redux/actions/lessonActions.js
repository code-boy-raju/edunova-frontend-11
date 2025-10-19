import API from '../../api/axiosUrl';
import {
  FETCH_LESSONS_SUCCESS,
  CREATE_LESSON_SUCCESS,
  DELETE_LESSON_SUCCESS,
} from '../ActionTypes';

// Fetch Lessons by Course
export const fetchLessonsByCourse = (courseId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/lesson/alllessons/${courseId}`);
    dispatch({ type: FETCH_LESSONS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch lessons';
  }
};

// Create Lesson (Instructor) - with video upload
export const createLesson = (formData, navigate, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.post('/lesson/postlesson', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 300000, // 5 minutes timeout for large videos
    });
    dispatch({ type: CREATE_LESSON_SUCCESS, payload: data.lesson });
    toastCallback('Lesson created successfully!');
    navigate(-1); // Go back to manage lessons
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to create lesson';
    toastCallback(msg);
    throw msg;
  }
};

// Update Lesson (Instructor)
export const updateLesson = (id, formData, toastCallback) => async (dispatch) => {
  try {
    const { data } = await API.put(`/lesson/updatelesson/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toastCallback('Lesson updated successfully!');
    return data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to update lesson';
    toastCallback(msg);
    throw msg;
  }
};

// Delete Lesson (Instructor)
export const deleteLesson = (id, toastCallback) => async (dispatch) => {
  try {
    await API.delete(`/lesson/deletelesson/${id}`);
    dispatch({ type: DELETE_LESSON_SUCCESS, payload: id });
    toastCallback('Lesson deleted successfully!');
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to delete lesson';
    toastCallback(msg);
    throw msg;
  }
};

// Get Single Lesson
export const fetchLessonDetails = (id) => async () => {
  try {
    const { data } = await API.get(`/lesson/onelesson/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch lesson';
  }
};