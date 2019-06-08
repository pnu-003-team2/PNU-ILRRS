import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class AirbnbTextInput extends Component {

  state = {
    isFocus: false,
  };

  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isSecured: PropTypes.bool.isRequired,
    keyboardIsNumberType: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: null,
  };

  onTextChange = (text) => {
    this.props.onChangeText(text);
  }

  onFocus = () => {
    this.setState({ isFocus: true });
  }

  onBlur = () => {
    this.setState({ isFocus: false });
  }

  render() {
    const { value, isSecured } = this.props;
    const { isFocus } = this.state;
    const {keyboardIsNumberType} = this.props;
    return (
      <View style={styles.container}>
        { (!isFocus && value.length === 0) ? <Text style={styles.placeholder}>{this.props.placeholder}</Text> : null}
        <TextInput
          keyboardType={keyboardIsNumberType ?  'number-pad' : 'default'}
          secureTextEntry={isSecured}
          style={styles.textInput}
          value={value}
          onChangeText={this.onTextChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  placeholder: {
    position: 'absolute',
    top: 2,
  },
  textInput: {
    fontSize: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
