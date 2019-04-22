import { combineReducers } from 'redux';

import { reducer as counter } from './counter';
import { reducer as user } from './user';

export default combineReducers({
  counter,
  user,
});
