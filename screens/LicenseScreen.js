import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class LicenseScreen extends Component {

  static navigationOptions = {
    title: '오픈소스 라이선스',
    headerTintColor: 'black',
  }

  state = {
    licenses: [
      {
        name: 'React-native-community/async-storage',
        url: 'https://github.com/react-native-community/async-storage',
        license: 'MIT License',
      },
      {
        name: 'Axios',
        url: 'https://github.com/axios/axios',
        license: 'MIT License',
      },
      {
        name: 'Camelcase-keys',
        url: 'https://github.com/sindresorhus/camelcase-keys/blob/master/license',
        license: 'MIT License',
      },
      {
        name: 'Prop-types',
        url: 'https://github.com/facebook/prop-types',
        license: 'MIT License',
      },
      {
        name: 'React',
        url: 'https://github.com/facebook/react',
        license: 'MIT License',
      },
      {
        name: 'React-native',
        url: 'https://github.com/facebook/react-native',
        license: 'MIT License',
      },
      {
        name: 'React-native-gesture-handler',
        url: 'https://github.com/kmagiera/react-native-gesture-handler',
        license: 'MIT License',
      },
      {
        name: 'React-native-gifted-chat',
        url: 'https://github.com/FaridSafi/react-native-gifted-chat',
        license: 'MIT License',
      },
      {
        name: 'React-native-image-picker',
        url: 'https://github.com/react-native-community/react-native-image-picker',
        license: 'MIT License',
      },
      {
        name: 'React-navigation',
        url: 'https://github.com/react-navigation/react-navigation',
        license: 'BSD2 License',
      },
      {
        name: 'React-redux',
        url: 'https://github.com/reduxjs/react-redux',
        license: 'MIT License',
      },
      {
        name: 'Redux',
        url: 'https://github.com/reduxjs/redux',
        license: 'MIT License',
      },
      {
        name: 'Redux-thunk',
        url: 'https://github.com/reduxjs/redux-thunk',
        license: 'MIT License',
      },
      {
        name: 'Sendbird',
        url: 'https://github.com/sendbird',
        license: 'MIT License',
      },
    ],
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.licenses}
          keyExtractor={(item) => item.name}
          renderItem={({item}) =>
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.url}</Text>
              <Text>{item.license}</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
  },
});
