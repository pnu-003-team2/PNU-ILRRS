import { combineReducers } from 'redux';

import {
  COURSE_LOAD_REQUEST,
  COURSE_LOAD_SUCCESS,
  COURSE_LOAD_FAILURE,
} from '../action-types';

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
