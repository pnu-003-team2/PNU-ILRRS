import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';

import CourseItem from './CourseItem';

const propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  onCoursePress: PropTypes.func,
};

const defaultProps = {
  courses: [],
  onCoursePress() {},
};

const CourseList = ({ courses, onCoursePress }) => (
  <FlatList
    style={styles.container}
    data={courses.map(course => ({ ...course, key: course.id.toString() }))}
    renderItem={({ item }) =>
      <CourseItem
        style={styles.course}
        course={item}
        onPress={onCoursePress}
      />
    }
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  course: {
    marginBottom: 22,
  },
});

CourseList.propTypes = propTypes;
CourseList.defaultProps = defaultProps;

export default CourseList;
