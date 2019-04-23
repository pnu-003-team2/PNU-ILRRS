import React from 'react';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import AppNavigator from './navigation/AppNavigator';
import configureStore from './state/configure-store';

Icon.loadFont();

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
