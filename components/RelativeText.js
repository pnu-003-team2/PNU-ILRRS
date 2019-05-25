import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  widthPercent: PropTypes.number,
};

const defaultProps = {
  style: null,
  widthPercent: 80,
};

function RelativeText({
  children,
  style,
  widthPercent,
  ...rest
}) {
  if (!children) {
    return null;
  }

  return (
    <Text
      autoCapitalize="none"
      children={children}
      style={[styles.text, { width: `${widthPercent}%` }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 15,
  },
});

RelativeText.propTypes = propTypes;
RelativeText.defaultProps = defaultProps;

export default RelativeText;
