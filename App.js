import React from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const idIcon = require('./pictures/login_id_icon.png');
const pwIcon = require('./pictures/login_pw_icon.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  state = {
    id :'',
    password:'',
    token: undefined
  }

  render() {
    const { id, password, tocken } = this.state;
    return (
        <View style = {styles.container}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={idIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput style = {styles.inputBox}
              placeholder = 'id'
              //value = {this.state.id}
              onChangeText = {(text) => this.setState({id:text})}
              placeholderTextColor = 'rgba(255,255,255,0.7)'>
            </TextInput>
          </View>

          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={pwIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput style = {styles.inputBox}
              placeholder = 'password'
             //value = {this.state.password}
              onChangeText = {(text) => this.setState({password:text})}
              placeholderTextColor = 'rgba(255,255,255,0.7)'
              secureTextEntry = {true}>
            </TextInput>
          </View>

          <TouchableOpacity style = {styles.LoginButton} onPress = {this.buttonClick}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
    );
  }
  /*
  LoginCheck = () =>{
    const {id,password} = this.state;
    alert("id:"+ this.state.id +" password:" +this.state.password);
  }
  */

  requestToken() {
    return new Promise((resolve, reject) => {
      setTimeout(function (){
        resolve('What is Token');
      }, 2000);
    });
  }

  async buttonClick () {
    const receivetoken = await this.requestToken();
    this.setState({token: receivetoken});
    //alert(receivetoken);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  inputBox:{
    width: 300,
    height : 40,
    //backgroundColor : "#1b89ea",
    opacity : 0.5,
    borderRadius : 20,
    marginBottom: 10,
    paddingHorizontal : 20,
    color: 'white',
  },
  LoginButton:{
    width: 340,
    height: 40,
    marginTop: 20,
    backgroundColor : 'gray',
  },
  buttonText : {
    textAlign: 'center',
    color:'white',
    fontWeight : '700',
    fontSize: 15,
    paddingTop: 8,
  },
});
