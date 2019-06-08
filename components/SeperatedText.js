import React from 'react';
import { Text, View } from 'react-native';

export default function SeperatedText({ style, timeTable }) {
  const [firstLine, secondLine] = timeTable.split(',', 2);
  return (
    <View>
      <Text style={style}>{firstLine}</Text>
      <Text style={style}>{secondLine}</Text>
    </View>
  );
}
