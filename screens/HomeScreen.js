import React from 'react';
import { View,Text, ScrollView, StyleSheet } from 'react-native';

import CourseListContainer from '../containers/CourseListContainer';
import FetchCourses from '../containers/FetchCourses';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  navigateToChat = (courseId) => {
    this.props.navigation.navigate('Chat', { courseId });
  }

  render() {
    return (
        <ScrollView style={styles.container}>
          <Text style={styles.TitleText}>강의목록</Text>
          <FetchCourses />
          <CourseListContainer onCoursePress={this.navigateToChat} />
        </ScrollView>
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
    paddingTop: 15,
    backgroundColor: '#f4f4f4',
  },
});

export default HomeScreen;
