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

import RelativeText from '../components/RelativeText';
import RelativeTextInput from '../components/RelativeTextInput';
import { login } from '../state/user/actions';
import { isInLogin } from '../state/user/selectors';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '로그인',
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
    const { isLoggedIn } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>강의톡</Text>
        <RelativeTextInput
          placeholder="학번"
          widthPercent={80}
          onChangeText={this.handleStudentIdChange}
        />
        <RelativeText>{studentIdError}</RelativeText>
        <RelativeTextInput
          placeholder="비밀번호"
          secureTextEntry
          widthPercent={80}
          onChangeText={this.handlePasswordChange}
        />
        <RelativeText>{passwordError}</RelativeText>
        {isLoggedIn && <ActivityIndicator size="large" color="#0000ff" />}
        {!isLoggedIn && (
          <Button
            disabled={this.shouldDisabled()}
            title="로그인"
            onPress={this.signIn}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: '45%',
    marginBottom: 50,
  },
});

const mapStateToProps = state => ({
  isLoggedIn: isInLogin(state),
});

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
