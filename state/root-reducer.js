import { combineReducers } from 'redux';

import { reducer as course } from './course';
import { reducer as sendbird } from './sendbird';
import { reducer as user } from './user';

export default combineReducers({
  course,
  sendbird,
  user,
});
