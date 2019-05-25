import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default class RoundLabel extends Component {
    render() {
        const { color, text } = this.props;
        return (
            <View style={[styles.box, { backgroundColor: color + '33' }]}>
                <Text style={[styles.text, { color }]}>
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 14,
        borderRadius: 10,
    },
    text: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
    },
});
