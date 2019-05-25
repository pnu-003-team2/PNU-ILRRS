import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CourseListContainer from '../containers/CourseListContainer';
import FetchCourses from '../containers/FetchCourses';
import FetchUserData from '../containers/FetchUserData';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  navigateToChat = (courseId) => {
    this.props.navigation.navigate('Chat', { courseId });
  }

  navigateToSetting = () => {
    this.props.navigation.navigate('Setting');
  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <FetchCourses />
        <FetchUserData />
        <ScrollView style={styles.courseContainer}>
          <View style={styles.settingIconConatiner}>
            <TouchableWithoutFeedback onPress={this.navigateToSetting}>
              <Icon
                name="settings"
                size={32}
                color="#333333"
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.TitleText}>강의목록</Text>
          <FetchCourses />
          <CourseListContainer onCoursePress={this.navigateToChat} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  settingIconConatiner: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  TitleText: {
    fontFamily : 'Roboto-Bold',
    fontSize: 40,
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal : 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  courseContainer: {
    paddingTop: 15,
  },
});

export default HomeScreen;
