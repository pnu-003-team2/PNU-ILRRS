import React from 'react';
import Login from './logins.js'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppNavigator from './navigation/AppNavigator';

Icon.loadFont();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent:'center',
   },
  mainLogo: {
    color: '#f8c224',
    fontSize: 70,
    backgroundColor: '#000000',
  },
  editHeader: {
    fontSize: 40,
    color: '#ffffff',
    textAlign: 'center',
  },
  editText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
