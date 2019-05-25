import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

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
    data={courses.map(course => ({ ...course, key: course.id.toString() }))}
    renderItem={({ item }) => <CourseItem course={item} onPress={onCoursePress} /> }
  />
);

CourseList.propTypes = propTypes;
CourseList.defaultProps = defaultProps;

export default CourseList;
