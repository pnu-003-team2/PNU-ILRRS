import { combineReducers } from 'redux';

import {
  COURSE_LOAD_REQUEST,
  COURSE_LOAD_SUCCESS,
  COURSE_LOAD_FAILURE,
} from '../action-types';

export function byId(state = {}, action) {
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

export function ids(state = [], action) {
  switch (action.type) {
    case COURSE_LOAD_SUCCESS:
      return action.payload.map(course => course.id);
    default:
      return state;
  }
}

export function isCourseLoading(state = false, action) {
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

export default combineReducers({
  byId,
  ids,
  isCourseLoading,
});
