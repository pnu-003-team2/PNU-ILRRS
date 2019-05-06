import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import CourseItem from './CourseItem';

const propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    classDivision: PropTypes.string,
    code: PropTypes.number,
    professorName: PropTypes.string,
    timeTable: PropTypes.string,
  })),
};

const defaultProps = {
  courses: [],
};

function CourseList({ courses, onPress }) {
  return (
    <FlatList
      data={courses.map(course => ({ ...course, key: course.id.toString() }))}
      renderItem={({ item }) => <CourseItem course={item} onPress={onPress} /> }
    />
  );
}

CourseList.propTypes = propTypes;
CourseList.defaultProps = defaultProps;

export default CourseList;
