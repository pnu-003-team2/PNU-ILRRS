import React, { Component } from 'react';
import { TouchableOpacity ,View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class RoundedButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    buttonColor: PropTypes.string.isRequired,
  };

  render() {
      const {buttonText, onPress, disabled, buttonColor} = this.props;
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.container,{backgroundColor: buttonColor}]}>
                <Text style={styles.textView}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 165,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    color: '#fafafa',
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
  },

});
