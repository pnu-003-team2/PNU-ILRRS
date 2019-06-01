import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import {
  sendbirdChannelMiddleware,
  sendbirdConnectionMiddleware,
  sendbirdDisconnectionMiddleware,
} from './sendbird/middlewares';

function configureStore() {
  const middlewares = [
    sendbirdChannelMiddleware,
    sendbirdConnectionMiddleware,
    sendbirdDisconnectionMiddleware,
    thunk,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}

export default configureStore;
