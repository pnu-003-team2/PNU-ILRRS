import React from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '설정',
  };

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  

  render() {
    return (
      <View>
        <Button title="로그아웃" onPress={this.signOut} />
      </View>
    );
  }
}
