import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

export const HelveticaText = props => (
  <Text
    {...props}
    style={[props.style, { fontFamily: 'Helvetica' }]}
  />
);
HelveticaText.propTypes = { style: PropTypes.object };
HelveticaText.defaultProps = { style: undefined };
