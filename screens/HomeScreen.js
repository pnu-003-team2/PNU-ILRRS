import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

import CourseListContainer from '../containers/CourseListContainer';
import FetchCourses from '../containers/FetchCourses';
import { SafeAreaView } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  navigateToChat = (courseId) => {
    this.props.navigation.navigate('Chat', { courseId });
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.courseContainer}>
            <Text style={styles.TitleText}>강의목록</Text>
            <FetchCourses />
            <CourseListContainer onCoursePress={this.navigateToChat} />
          </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  TitleText:{
    fontFamily : 'Roboto-Bold',
    fontSize: 40,
    marginBottom: 20,
    marginTop: 40,
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
