import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
  );
  return store;
}

export default configureStore;
