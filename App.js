import React from 'react';
import { Platform, TouchableOpacity, StatusBar, StyleSheet, Text,TextInput, View } from 'react-native';
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
    id :"",
    password:"",
  }
  render() {
    const {id,password} = this.state;
    return (
        <View style = {styles.container}>
          <TextInput
            style = {styles.inputBox}
            placeholder = "id"
           // value = {this.state.id}
            onChangeText = {(text) => this.setState({id:text})}
            placeholderTextColor = "rgba(255,255,255,0.7)">
          </TextInput>
          <TextInput
            style = {styles.inputBox}
            placeholder = "password"
           // value = {this.state.password}
            onChangeText = {(text) => this.setState({password:text})}
            placeholderTextColor = "rgba(255,255,255,0.7)">
          </TextInput>
          <TouchableOpacity 
            style = {styles.LoginButton}
            onPress = {this.LoginCheck}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
    );
  }
  LoginCheck = () =>{
    const {id,password} = this.state;
    alert("id:"+ this.state.id +" password:" +this.state.password);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  inputBox:{
    width: 300,
    height : 40,
    backgroundColor : "#1b89ea",
    opacity : 0.5,
    borderRadius : 20,
    marginBottom: 10,
    paddingHorizontal : 20
  },
  LoginButton:{
    width: 300,
    height : 40,
    backgroundColor : "#1b89ea",
    borderRadius : 20,
  },
  buttonText : {
    textAlign: "center",
    color:"white",
    fontWeight : '700',
    fontSize: 15,
    paddingTop: 8
  }
});
