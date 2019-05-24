import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Button, View, StyleSheet,TouchableOpacity, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class SettingsScreen extends React.Component {
  state = {
    avatarSource : null,
  };

  constructor(props){
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  
  static navigationOptions = {
    title: '설정',
  };

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
  
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={.5}>
              {this.state.avatarSource === null ? 
              (<Image style={styles.avatar} source={{uri : 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>) : 
              <Image style={styles.avatar} source={this.state.avatarSource}/>
              }
            </TouchableOpacity> 
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Deok Hyeon</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Computer Engineering</Text>

              <TouchableOpacity onPress={this.signOut} style={styles.buttonContainer}>
                <Text>Logout</Text>  
              </TouchableOpacity> 
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={styles.buttonContainer}>
                <Text>Image Change</Text>  
              </TouchableOpacity>              
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    backgroundColor: "#00BFFF",
  },
});
 