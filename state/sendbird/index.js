import SendBird from 'sendbird';

import {
  SENDBIRD_CHANNEL_FETCH_REQUEST,
  SENDBIRD_CHANNEL_FETCH_SUCCESS,
  SENDBIRD_CHANNEL_FETCH_FAILURE,
  SENDBIRD_CONNECT_REQUEST,
  SENDBIRD_CONNECT_SUCCESS,
  SENDBIRD_CONNECT_FAILURE,
} from '../action-types';
import {
  connectSendbirdSuccess,
  connectSendbirdFailure,
  fetchChannelSuccess,
  fetchChannelFailure,
} from './actions';

const sb = new SendBird({ appId: '' });

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
  isChannelFetcting: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDBIRD_CHANNEL_FETCH_REQUEST:
      return {
        ...state,
        isChannelFetcting: true,
      };
    case SENDBIRD_CHANNEL_FETCH_SUCCESS:
    case SENDBIRD_CHANNEL_FETCH_FAILURE:
      return {
        ...state,
        isChannelFetcting: true,
      };
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
