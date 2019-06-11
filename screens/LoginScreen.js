import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

import RoundedButton from '../components/RoundedButton';
import AirbnbTextInput from '../components/AirbnbTextInput';
import { login } from '../state/user/actions';
import { isInLogin } from '../state/user/selectors';


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
      const message = '학번과 비밀번호를 올바르게 입력해 주세요 크흠...';
      Alert.alert('로그인 실패', message, [
        { text: '확인' },
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
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.greetingContainer}>
            <Text style={styles.upperGreeting}>환영합니다.</Text>
            <Text style={styles.underGreeting}>아래에 정보를 입력하세요!</Text>
          </View>
          <View style={styles.inputContainer}>
            <AirbnbTextInput
              placeholder="학번"
              isSecured={false}
              keyboardIsNumberType={true}
              value={this.state.studentId}
              onChangeText={this.handleStudentIdChange}
            />
            <Text>{studentIdError}</Text>
            <AirbnbTextInput
              placeholder="비밀번호"
              isSecured={true}
              keyboardIsNumberType={false}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
            />
            <Text>{passwordError}</Text>
          </View>

          {isLoggedIn && <ActivityIndicator size="large" color="#0000ff" />}
          {!isLoggedIn && (
            <View style={styles.loginView}>
              <RoundedButton
                buttonText="시작하기"
                onPress={this.signIn}
                disabled={this.shouldDisabled()}
                buttonColor="#4f54fb"
              />
            </View>
            // <Button style = {styles.loginbutton}
            //   disabled={this.shouldDisabled()}
            //   title="로그인"
            //   onPress={this.signIn}
            // />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginView: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
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
});

const mapStateToProps = state => ({
  isLoggedIn: isInLogin(state),
});

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
