import {
  SENDBIRD_CHANNEL_FETCH_REQUEST,
  SENDBIRD_CHANNEL_FETCH_SUCCESS,
  SENDBIRD_CHANNEL_FETCH_FAILURE,
  SENDBIRD_CONNECT_REQUEST,
  SENDBIRD_CONNECT_SUCCESS,
  SENDBIRD_CONNECT_FAILURE,
  SENDBIRD_DISCONNECT_SUCCESS,
} from '../action-types';

export function channel(state = {}, action) {
  switch (action.type) {
    case SENDBIRD_CHANNEL_FETCH_SUCCESS:
      return {
        ...state,
        [action.courseId]: action.channel,
      };
    default:
      return state;
  }
}

const initialState = {
  connected: false,
  isConnecting: false,
  isChannelFetcting: false,
  channel: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SENDBIRD_CHANNEL_FETCH_REQUEST:
      return {
        ...state,
        isChannelFetcting: true,
      };
    case SENDBIRD_CHANNEL_FETCH_SUCCESS:
      return {
        ...state,
        channel: channel(state.channel, action),
      };
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
    case SENDBIRD_DISCONNECT_SUCCESS:
      return {
        ...state,
        connected: false,
      };
    default:
      return state;
  }
}
