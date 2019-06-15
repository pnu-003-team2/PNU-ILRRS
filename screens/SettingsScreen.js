import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';

import {
  changeProfileRequest,
} from '../state/sendbird/actions';
import {
  getName,
  getProfileUrl,
  getUserId,
} from '../state/user/selectors';

const propTypes = {
  avatarSource : PropTypes.string,
  userName : PropTypes.string,
  userNumber : PropTypes.string,
  onProfileChange: PropTypes.func,
};

const defaultProps = {
  avatarSource : 'https://bootdey.com/img/Content/avatar/avatar6.png',
  userName : '',
  userNumber : '',
  onProfileChange() {},
};

class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: '설정',
    headerTintColor: 'black',
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
        const { userName, onProfileChange } = this.props;
        const url = `data:${response.type};base64,${response.data}`;

        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            const objectUrl = window.URL.createObjectURL(blob);
            onProfileChange(userName, objectUrl);
          });
      }
    });
  }

  goOpenSourceScreen = () => {
    this.props.navigation.navigate('License');
  }

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  getProfileSource() {
    return this.props.avatarSource || 'https://bootdey.com/img/Content/avatar/avatar6.png';
  }

  render() {
    return (
      <SafeAreaView style={styles.conatiner}>
        <ScrollView style={styles.scrollView}>

          <View style={styles.profileContainer}>
            <TouchableOpacity activeOpacity={0.5} style={styles.avatarframe} onPress={this.selectPhotoTapped} >
              <Image
                style={styles.avatar}
                source={{uri: this.getProfileSource()}}
              />
            </TouchableOpacity>

            <View style={styles.informationContainer}>
              <Text style={styles.name}>{this.props.userName}</Text>
              <Text style={styles.studentNumb}>{this.props.userNumber}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={this.goOpenSourceScreen}>
            <View style={styles.openSourceContainer}>
              <Text style={styles.openSource}>오픈소스 라이선스</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.signOut}>
            <View style={styles.logoutContainer}>
              <Text style={styles.logout}>로그아웃</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

SettingsScreen.propTypes = propTypes;
SettingsScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: '#cecece',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#b5b5b5',
  },
  informationContainer: {
    paddingTop: 15,
    marginLeft: 25,
    flexDirection: 'column',
  },
  name: {
    fontSize: 21,
    fontFamily: 'Roboto-Regular',
    color: '#383838',
  },
  studentNumb: {
    marginTop: 5,
    fontSize: 19,
    fontFamily: 'Roboto-Regular',
    color: '#383838',
  },
  openSourceContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.3,
    borderColor: '#cecece',
  },
  openSource: {
    fontSize: 15,
  },
  logoutContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.3,
    borderColor: '#cecece',
  },
  logout: {
    fontSize: 15,
  },
});

const mapStateToProps = state => ({
  avatarSource: getProfileUrl(state),
  userName: getName(state),
  userNumber: getUserId(state),
});

const mapDispatchToProps = {
  onProfileChange: changeProfileRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
