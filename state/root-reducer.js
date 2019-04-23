import { combineReducers } from 'redux';

import { reducer as course } from './course';
import { reducer as user } from './user';

export default combineReducers({
  course,
  user,
});
