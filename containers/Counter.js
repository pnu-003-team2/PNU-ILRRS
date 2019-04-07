import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import {
  decreaseCounter,
  increaseCounter,
  getCounter,
} from '../state/counter';

function Counter({
  counter,
  onDecrease,
  onIncrease,
}) {
  return (
    <View style={styles.container}>
      <Text>counter value: {counter}</Text>
      <Button title="increate counter" onPress={onIncrease} />
      <Button title="decrease counter" onPress={onDecrease} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  counter: getCounter(state),
});

const mapDispatchToProps = {
  onIncrease: increaseCounter,
  onDecrease: decreaseCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
