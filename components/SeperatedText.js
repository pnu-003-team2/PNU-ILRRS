import React from 'react';
import { Text, View } from 'react-native';

export default function SeperatedText({ timeTable }) {
  const [firstLine, secondLine] = timeTable.split(',', 2);
  return (
    <View>
      <Text>{firstLine}</Text>
      <Text>{secondLine}</Text>
    </View>
  );
}
