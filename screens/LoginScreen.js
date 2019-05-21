import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

import { isInLogin, login } from '../state/user';
import AirbnbTextInput from '../components/AirbnbTextInput';

class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    studentId: '',
    studentIdError: '',
    password: '',
    passwordError: '',
  };

  signIn = async () => {
    try {
      const { studentId, password } = this.state;
      const token = await this.props.onLogin(studentId, password);
      await AsyncStorage.setItem('userToken', token);
      this.props.navigation.navigate('Main');
    } catch (error) {
      const message = error.message || '잠시 후 다시 시도해주세요.';
      Alert.alert('로그인 실패', message, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ],
      { cancelable: false });
    }
  };

  shouldDisabled() {
    const { studentId, studentIdError, password, passwordError } = this.state;
    return !!(studentIdError || passwordError || !studentId || !password);
  }

  handleStudentIdChange = (text) => {
    const studentId = text.trim();
    let error = '';
    if (!studentId) {
      error = '학번을 입력해주세요.';
    }
    this.setState({ studentId: studentId.trim(), studentIdError: error });
  }

  handlePasswordChange = (text) => {
    const password = text.trim();
    let error = '';
    if (!password) {
      error = '비밀번호를 입력해주세요.';
    }
    this.setState({ password, passwordError: error });
  }

  render() {
    const { studentIdError, passwordError } = this.state;
    const { isInLogin } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.upperGreeting}>환영합니다.</Text>
          <Text style={styles.underGreeting}>아래에 정보를 입력하세요!</Text>
        </View>
        <View style={styles.inputContainer}>
          <AirbnbTextInput
            style={styles.studentNoInput}
            placeholder="학번"
            value={this.state.studentId}
            onChangeText={this.handleStudentIdChange}
          />
          <Text>{studentIdError}</Text>
          <AirbnbTextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
          />
          <Text>{passwordError}</Text>
        </View>
        
        {isInLogin && <ActivityIndicator size="large" color="#0000ff" />}
        {!isInLogin && (
          <Button
            disabled={this.shouldDisabled()}
            title="로그인"
            onPress={this.signIn}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingContainer: {
    paddingVertical: 90,
    paddingHorizontal: 40,
  },
  upperGreeting: {
    marginBottom: 7,
    fontSize: 40,
    fontFamily: 'Roboto-Bold',
    color: '#404040',
  },
  underGreeting: {
    fontSize: 23,
    fontFamily: 'Roboto-Regular',
    color: '#4B4B4B',
  },
  inputContainer: {
    height: 180,
    flexDirection: 'column',
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  Input: {
    
  },
});

const mapStateToProps = state => ({
  isInLogin: isInLogin(state),
});

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
