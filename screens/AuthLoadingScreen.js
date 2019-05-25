import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { changeUserToken } from '../state/user/actions';

const propTypes = {
  onTokenChange: PropTypes.func,
};

const defaultProps = {
  onTokenChange() {},
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.props.onTokenChange(userToken);
      this.props.navigation.navigate('Main', { userToken });
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = propTypes;
AuthLoadingScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapDispatchToProps = {
  onTokenChange: changeUserToken,
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);
