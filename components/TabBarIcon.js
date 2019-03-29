import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  static propTypes = {
    focused: PropTypes.bool,
  };
  static defaultProps = {
    focused: false,
  };

  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={styles.icon}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
