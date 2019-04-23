import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStackNavigator = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthStackNavigator,
}, {
  initialRouteName: 'AuthLoading',
}));
