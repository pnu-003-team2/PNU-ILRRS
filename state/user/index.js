import { fakeApi } from '../api';

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

export function loginSuccess(payload) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
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
export const login = (id, password) => async (dispatch, getState) => {
  if (isInLogin(getState())) {
    return Promise.reject(new Error('로그인 요청 중 입니다.'));
  }

  dispatch(loginRequest(id, password));

  try {
    const response = await fakeApi('/user/login', {
      method: 'POST',
      data: {
        id,
        password,
      },
    });
    dispatch(loginSuccess(response.data));
    return response.data.jwtToken;
  } catch (error) {
    dispatch(loginFailure(error));
    return Promise.reject(error);
  }
};

export function reducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isInLogin: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isInLogin: false,
        jwtToken: action.payload.jwtToken,
      };
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
export const getToken = state => state.user.jwtToken;
