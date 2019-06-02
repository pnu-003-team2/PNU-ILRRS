import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CourseList from '../components/CourseList';
import { getCourses } from '../state/course/selectors';

const propTypes = {
  courses: PropTypes.array,
  onCoursePress: PropTypes.func.isRequired,
};

const defaultProps = {
  courses: [],
  onCoursePress() {},
};

function CourseListContainer({ courses, onCoursePress }) {
  return <CourseList courses={courses} onCoursePress={onCoursePress} />;
}

CourseListContainer.propTypes = propTypes;
CourseListContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  courses: getCourses(state),
});

export default connect(mapStateToProps)(CourseListContainer);
