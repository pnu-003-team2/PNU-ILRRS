import {
  SENDBIRD_CHANNEL_FETCH_REQUEST,
  SENDBIRD_CHANNEL_FETCH_SUCCESS,
  SENDBIRD_CHANNEL_FETCH_FAILURE,
  SENDBIRD_CONNECT_REQUEST,
  SENDBIRD_CONNECT_SUCCESS,
  SENDBIRD_CONNECT_FAILURE,
  SENDBIRD_DISCONNECT_REQUEST,
  SENDBIRD_DISCONNECT_SUCCESS,
  SENDBIRD_DISCONNECT_FAILURE,
  SENDBIRD_PROFILE_CHANGE_REQUEST,
  SENDBIRD_PROFILE_CHANGE_SUCCESS,
  SENDBIRD_PROFILE_CHANGE_FAILURE,
} from '../action-types';
import {
  getSendbirdAccessToken,
  getUserId,
} from '../user/selectors';

export function connectSendbirdRequest(userId, sendbirdAccessToken) {
  return {
    type: SENDBIRD_CONNECT_REQUEST,
    payload: {
      userId,
      sendbirdAccessToken,
    },
  };
}

export function connectSendbirdSuccess(user) {
  return {
    type: SENDBIRD_CONNECT_SUCCESS,
    payload: user,
  };
}

export function connectSendbirdFailure(error) {
  return {
    type: SENDBIRD_CONNECT_FAILURE,
    payload: error,
    error: true,
  };
}

export const connectSendbird = () => (dispatch, getState) => {
  const userId = getUserId(getState());
  const sendbirdAccessToken = getSendbirdAccessToken(getState());
  dispatch(connectSendbirdRequest(userId, sendbirdAccessToken));
};

export function disconnectSendbirdRequest(userId, sendbirdAccessToken) {
  return {
    type: SENDBIRD_DISCONNECT_REQUEST,
    payload: {
      userId,
      sendbirdAccessToken,
    },
  };
}

export function disconnectSendbirdSuccess() {
  return {
    type: SENDBIRD_DISCONNECT_SUCCESS,
  };
}

export function disconnectSendbirdFailure(error) {
  return {
    type: SENDBIRD_DISCONNECT_FAILURE,
    payload: error,
    error: true,
  };
}

export const disconnectSendbird = () => (dispatch, getState) => {
  const userId = getUserId(getState());
  const sendbirdAccessToken = getSendbirdAccessToken(getState());
  dispatch(disconnectSendbirdRequest(userId, sendbirdAccessToken));
};

export function fetchChannelRequest(channelUrl, courseId) {
  return {
    type: SENDBIRD_CHANNEL_FETCH_REQUEST,
    channelUrl,
    courseId,
  };
}

export function fetchChannelSuccess(courseId, channel) {
  return {
    type: SENDBIRD_CHANNEL_FETCH_SUCCESS,
    courseId,
    channel,
  };
}

export function fetchChannelFailure(error) {
  return {
    type: SENDBIRD_CHANNEL_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function changeProfileRequest(nickname, file) {
  return {
    type: SENDBIRD_PROFILE_CHANGE_REQUEST,
    file,
    nickname,
  };
}

export function changeProfileSuccess(payload) {
  return {
    type: SENDBIRD_PROFILE_CHANGE_SUCCESS,
    payload,
  };
}

export function changeProfileFailure(error) {
  return {
    type: SENDBIRD_PROFILE_CHANGE_FAILURE,
    payload: error,
    error: true,
  };
}
