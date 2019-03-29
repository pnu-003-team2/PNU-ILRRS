import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

export const HelveticaText = props => (
  <Text
    {...props}
    style={[props.style, styles.text]}
  />
);
HelveticaText.propTypes = { style: PropTypes.object };
HelveticaText.defaultProps = { style: undefined };

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Helvetica',
  },
});
