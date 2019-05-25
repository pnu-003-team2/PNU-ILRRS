import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCourse } from '../state/course/actions';
import { getCourses } from '../state/course/selectors';

const propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  onLoadCourse: PropTypes.func,
};

const defaultProps = {
  courses: [],
  onLoadCourse() {},
};

function FetchCourses({ courses, onLoadCourse }) {
  useEffect(() => {
    if (courses.length === 0) {
      onLoadCourse();
    }
  }, [courses.length]);
  return null;
}

FetchCourses.propTypes = propTypes;
FetchCourses.defaultProps = defaultProps;

const mapStateToProps = state => ({
  courses: getCourses(state),
});

const mapDispatchToProps = {
  onLoadCourse: loadCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchCourses);
