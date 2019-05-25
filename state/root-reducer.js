import { combineReducers } from 'redux';

import course from './course/reducers';
import sendbird from './sendbird/reducers';
import user from './user/reducers';

export default combineReducers({
  course,
  sendbird,
  user,
});
