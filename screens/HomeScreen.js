import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import CourseListContainer from '../containers/CourseListContainer';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  navigateToChat = (courseId) => {
    this.props.navigation.navigate('Chat', { courseId });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <CourseListContainer onCoursePress={this.navigateToChat} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
