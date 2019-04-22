import api, { fakeApi } from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

/**
 *
 * @param {number} id
 * @param {string} password
 */
export function loginRequest(id, password) {
  return {
    type: USER_LOGIN_REQUEST,
    payload: {
      id,
      password,
    },
  };
}

export function loginSuccess() {
  return {
    type: USER_LOGIN_SUCCESS,
  };
}

/**
 *
 * @param {Error} error
 */
export function loginFailure(error) {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
}

/**
 * @param {number} id
 * @param {string} password
 */
export const login = (id, password) => (dispatch, getState) => {
  if (isInLogin(getState())) {
    return Promise.reject(new Error('로그인 요청 중 입니다.'));
  }

  dispatch(loginRequest(id, password));

  /**
   * @todo Remove this fake API mocking
   */
  return fakeApi('/user/login', {
    method: 'POST',
    body: {
      id,
      password,
    },
  }).then((response) => {
    dispatch(loginSuccess(response));
    return response.data;
  }, (error) => {
    dispatch(loginFailure(error));
    return Promise.reject(error);
  })
};

export function reducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isInLogin: true,
      };
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isInLogin: false,
      };
    default:
      return state;
  }
}

export const isInLogin = state => state.user.isInLogin;
