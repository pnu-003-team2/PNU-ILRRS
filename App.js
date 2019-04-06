import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
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

  state = {
    ID: "",
    PW: ""
  }

  render() {
    const { ID, PW } = this.state;
    return (
      <View style={styles.container}>
        <TextInput 
          value={ID} 
          placeholder={"ID"} 
          placeholderTextColor={"#999"}
          autoCorrect={false}
          returnKeyType={"done"}
          onChangeText={this._crontolID}
          onSubmitEditing={this._addID}
        />
        <TextInput 
          value={PW} 
          placeholder={"Password"} 
          placeholderTextColor={"#999"}
          autoCorrect={false}
          returnKeyType={"done"}
          onChangeText={this._crontolPW}
          onSubmitEditing={this._addPW}
        />

        <Button
          onPress={() => {
            Alert.alert('LogIn');
          }}
          title="LogIn"
          color="#841584"
        />

      </View>
    );
  }

  _crontolID = text=>{
    this.setState({
      ID: text
    })
  };

  _crontolPW = text=>{
    this.setState({
      PW: text
    })
  };

  _addID = text => {
    this.setState({
      ID: text
    })
  };

  _addPW = text => {
    this.setState({
      PW: text
    })
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
