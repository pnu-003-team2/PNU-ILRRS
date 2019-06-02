import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_TOKEN_CHANGE,
} from '../action-types';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return {
        ...state,
        isUserDataLoading: true,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isUserDataLoading: false,
      };
    case USER_DATA_FAILURE:
      return {
        ...state,
        isUserDataLoading: false,
      };
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
    case USER_TOKEN_CHANGE:
      return {
        ...state,
        jwtToken: action.payload,
      };
    default:
      return state;
  }
}
