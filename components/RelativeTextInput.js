import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

const propTypes = {
  style: PropTypes.object,
  widthPercent: PropTypes.number,
};

const defaultProps = {
  style: null,
  widthPercent: 80,
};

function RelativeTextInput({
  style,
  widthPercent,
  ...rest
}) {
  return (
    <TextInput
      autoCapitalize="none"
      style={[styles.textInput, { width: `${widthPercent}%` }, style]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
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
  },
})

RelativeTextInput.propTypes = propTypes;
RelativeTextInput.defaultProps = defaultProps;

export default RelativeTextInput;
