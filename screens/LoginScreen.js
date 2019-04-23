import React from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { isInLogin, login } from '../state/user';

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
    const { isInLogin } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>강의톡</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          placeholder="학번"
          onChangeText={this.handleStudentIdChange}
        />
        {!!studentIdError && <Text style={styles.errorMessage}>{studentIdError}</Text>}
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
          placeholder="비밀번호"
          onChangeText={this.handlePasswordChange}
        />
        {!!passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>}
        {isInLogin && <ActivityIndicator size="large" color="#0000ff" />}
        {!isInLogin && (
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
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    padding: 10,
    height: 40,
    width: '80%'
  },
  errorMessage: {
    width: '80%',
    marginBottom: 15,
  },
});

const mapStateToProps = state => ({
  isInLogin: isInLogin(state),
});

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
