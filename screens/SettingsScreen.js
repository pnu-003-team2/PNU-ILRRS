import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

const propTypes = {
  avatarSource : PropTypes.string,
  userName : PropTypes.string,
  userNumber : PropTypes.string,
};

const defaultProps = {
  avatarSource : "https://bootdey.com/img/Content/avatar/avatar6.png",
  userName : "손덕현",
  userNumber : "201324467",
};

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: '설정',
  };

  selectPhotoTapped = () => {
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
          avatarSource : source,
        });
      }
    });
  }

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.5} style={styles.avatarframe} onPress={this.selectPhotoTapped} >
              <Image
                  style={styles.avatar}
                  source={{uri: this.props.avatarSource}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.props.userName}</Text>
              <Text style={styles.info}>{this.props.userNumber}</Text>
              <Text style={styles.description}>Computer Engineering</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.signOut}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

SettingsScreen.propTypes = propTypes;
SettingsScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height:200,
  },
  avatarframe: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 130,

  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 63,
    borderWidth: 3,
    alignSelf:'center',
  },
  body: {
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name: {
    fontSize:28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize:16,
    color: '#00BFFF',
    marginTop:10,
  },
  description: {
    fontSize:16,
    color: '#696969',
    marginTop:10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop:100,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    backgroundColor: '#00BFFF',
  },
});
	