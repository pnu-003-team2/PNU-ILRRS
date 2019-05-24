import SendBird from 'sendbird';

import {
  getSendbirdAccessToken,
  getUserId,
} from '../user';

const sb = new SendBird({ appId: '' });

export const SENDBIRD_CONNECT_REQUEST = 'SENDBIRD_CONNECT_REQUEST';
export const SENDBIRD_CONNECT_SUCCESS = 'SENDBIRD_CONNECT_SUCCESS';
export const SENDBIRD_CONNECT_FAILURE = 'SENDBIRD_CONNECT_FAILURE';
export const SENDBIRD_CHANNEL_FETCH_REQUEST = 'SENDBIRD_CHANNEL_FETCH_REQUEST';
export const SENDBIRD_CHANNEL_FETCH_SUCCESS = 'SENDBIRD_CHANNEL_FETCH_SUCCESS';
export const SENDBIRD_CHANNEL_FETCH_FAILURE = 'SENDBIRD_CHANNEL_FETCH_FAILURE';

const connectSendbirdRequest = (userId, sendbirdAccessToken) => ({
  type: SENDBIRD_CONNECT_REQUEST,
  payload: {
    userId,
    sendbirdAccessToken,
  },
});

const connectSendbirdSuccess = user => ({
  type: SENDBIRD_CONNECT_SUCCESS,
  payload: user,
});

const connectSendbirdFailure = error => ({
  type: SENDBIRD_CONNECT_FAILURE,
  payload: error,
  error: true,
});

export const connectSendbird = () => (dispatch, getState) => {
  const userId = getUserId(getState());
  const sendbirdAccessToken = getSendbirdAccessToken(getState());
  dispatch(connectSendbirdRequest(userId, sendbirdAccessToken));
};

export const sendbirdConnectionMiddleware = () => next => (action) => {
  if (action.type !== SENDBIRD_CONNECT_REQUEST) {
    return next(action);
  }

  next(action);

  const { userId, sendbirdAccessToken } = action.payload;
  sb.connect(userId, sendbirdAccessToken, (user, error) => {
    if (error) {
      next(connectSendbirdFailure(error));
    } else {
      next(connectSendbirdSuccess(user));
    }
  });
};

export const fetchChannelRequest = (channelUrl) => ({
  type: SENDBIRD_CHANNEL_FETCH_REQUEST,
  payload: channelUrl,
});

export const fetchChannelSuccess = (payload) => ({
  type: SENDBIRD_CHANNEL_FETCH_SUCCESS,
  payload,
});

export const fetchChannelFailure = (error) => ({
  type: SENDBIRD_CHANNEL_FETCH_FAILURE,
  payload: error,
  error: true,
});

export const sendbirdChannelMiddleware = () => next => (action) => {
  if (action.type !== SENDBIRD_CHANNEL_FETCH_REQUEST) {
    return next(action);
  }
  next(action);

  sb.GroupChannel.getChannel(action.payload, (groupChannel, error) => {
    if (error) {
      next(fetchChannelFailure(error));
    } else {
      console.log(groupChannel);
      next(fetchChannelSuccess(groupChannel));
    }
  });
};

const initialState = {
  connected: false,
  isConnecting: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDBIRD_CONNECT_REQUEST:
      return {
        ...state,
        isConnecting: true,
      };
    case SENDBIRD_CONNECT_SUCCESS:
      return {
        ...state,
        isConnecting: false,
        connected: true,
      };
    case SENDBIRD_CONNECT_FAILURE:
      return {
        ...state,
        isConnecting: false,
        connected: false,
      };
    default:
      return state;
  }
};

export const isConnecting = state => state.sendbird.isConnecting;
export const isSendbirdConnected = state => state.sendbird.connected;
