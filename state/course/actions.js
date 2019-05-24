import {
  COURSE_LOAD_REQUEST,
  COURSE_LOAD_SUCCESS,
  COURSE_LOAD_FAILURE,
} from '../action-types';
import { fakeApi } from '../api';
import { isCourseLoading } from './selectors';

export function loadCourseRequest() {
  return {
    type: COURSE_LOAD_REQUEST,
  };
}

export function loadCourseSuccess(payload) {
  return {
    type: COURSE_LOAD_SUCCESS,
    payload,
  };
}

export function loadCourseFailure(error) {
  return {
    type: COURSE_LOAD_FAILURE,
    payload: error,
    error: true,
  };
}

export const loadCourse = () => async (dispatch, getState) => {
  if (isCourseLoading(getState())) {
    return Promise.reject(new Error('강의를 가져오고 있습니다.'));
  }

  dispatch(loadCourseRequest());

  try {
    const { data } = await fakeApi('/course', { credentials: true });
    dispatch(loadCourseSuccess(data));
  } catch (error) {
    dispatch(loadCourseFailure(error));
    return Promise.reject(error);
  }
};
