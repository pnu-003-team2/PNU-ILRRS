import { SENDBIRD_APP_ID } from 'react-native-dotenv';
import SendBird from 'sendbird';

import {
  SENDBIRD_CHANNEL_FETCH_REQUEST,
  SENDBIRD_CONNECT_REQUEST,
} from '../action-types';
import {
  connectSendbirdSuccess,
  connectSendbirdFailure,
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

  sb.GroupChannel.getChannel(action.payload, (groupChannel, error) => {
    if (error) {
      next(fetchChannelFailure(error));
    } else {
      next(fetchChannelSuccess(groupChannel));
    }
  });
};
