import { combineReducers } from 'redux';

import { fakeApi } from '../api';

export const COURSE_LOAD_REQUEST = 'COURSE_LOAD_REQUEST';
export const COURSE_LOAD_SUCCESS = 'COURSE_LOAD_SUCCESS';
export const COURSE_LOAD_FAILURE = 'COURSE_LOAD_FAILURE';

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
}

function byId(state = {}, action) {
  switch (action.type) {
    case COURSE_LOAD_SUCCESS:
      const newState = {};
      action.payload.forEach((course) => {
        newState[course.id] = course;
      });
      return newState;
    default:
      return state;
  }
}

function ids(state = [], action) {
  switch (action.type) {
    case COURSE_LOAD_SUCCESS:
      return action.payload.map(course => course.id);
    default:
      return state;
  }
}

function isCourseLoadingReducer(state = false, action) {
  switch (action.type) {
    case COURSE_LOAD_REQUEST:
      return true;
    case COURSE_LOAD_SUCCESS:
    case COURSE_LOAD_FAILURE:
      return false;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  byId,
  ids,
  isCourseLoading: isCourseLoadingReducer,
});

export const isCourseLoading = state => state.course.isCourseLoading;
export const getCourses = state => state.course.ids.map(id => state.course.byId[id]);
export const getCourseSendbirdChannelUrl = (state, props) => {
  if (props.courseId in state.course.byId) {
    return state.course.byId[props.courseId].channelUrl;
  }
  return null;
};
