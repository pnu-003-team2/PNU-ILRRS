import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from '../action-types';
import api from '../api';
import { isInLogin } from './selectors';

export function loadUserRequest() {
  return {
    type: USER_DATA_REQUEST,
  };
}

export function loadUserSuccess(payload) {
  return {
    type: USER_DATA_SUCCESS,
    payload,
  };
}

export function loadUserFailure(error) {
  return {
    type: USER_DATA_FAILURE,
    payload: error,
    error: true,
  };
}

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

export const loadUser = () => async (dispatch) => {
  dispatch(loadUserRequest());

  try {
    const response = await api('/user', {
      method: 'GET',
      credentials: true,
    });
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    dispatch(loadUserFailure(error));
  }
};

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
    const response = await api('/user/login', {
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
