import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import LicenseScreen from '../screens/LicenseScreen';

export default createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Setting: SettingsScreen,
  License: LicenseScreen,
});
