import { SENDBIRD_APP_ID } from 'react-native-dotenv';
import SendBird from 'sendbird';

import {
  SENDBIRD_CHANNEL_FETCH_REQUEST,
  SENDBIRD_CONNECT_REQUEST,
  SENDBIRD_DISCONNECT_REQUEST,
} from '../action-types';
import {
  connectSendbirdSuccess,
  connectSendbirdFailure,
  disconnectSendbirdSuccess,
  disconnectSendbirdFailure,
  fetchChannelSuccess,
  fetchChannelFailure,
} from './actions';

const sb = new SendBird({ appId: SENDBIRD_APP_ID });

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

  const { channelUrl, courseId } = action;

  sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
    if (error) {
      next(fetchChannelFailure(error));
    } else {
      next(fetchChannelSuccess(courseId, groupChannel));
    }
  });
};

export const sendbirdDisconnectionMiddleware = () => next => (action) => {
  if (action.type !== SENDBIRD_DISCONNECT_REQUEST) {
    return next(action);
  }

  next(action);

  sb.disconnect((response, error) => {
    if (error) {
      next(disconnectSendbirdFailure(error));
    } else {
      next(disconnectSendbirdSuccess());
    }
  });
};
