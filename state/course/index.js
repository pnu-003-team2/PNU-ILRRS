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

  /**
   * @todo Remove this fake API mocking
   */
  try {
    const { data } = await fakeApi('/course');
    dispatch(loadCourseSuccess(data));
  } catch (error) {
    dispatch(loadCourseFailure(error));
    return Promise.reject(error);
  }
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case COURSE_LOAD_REQUEST:
      return {
        ...state,
        isCourseLoading: true,
      };
    case COURSE_LOAD_SUCCESS:
    case COURSE_LOAD_FAILURE:
      return {
        ...state,
        isCourseLoading: false,
      };
    default:
      return state;
  }
}

export const isCourseLoading = state => state.course.isCourseLoading;
