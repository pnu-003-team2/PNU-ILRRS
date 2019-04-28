import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CourseList from '../components/CourseList';
import { getCourses, loadCourse } from '../state/course';

const propTypes = {
  courses: PropTypes.array,
};

const defaultProps = {
  courses: [],
};

class CourseListContainer extends React.Component {
  componentDidMount() {
    this.props.onLoadCourse();
  }

  render() {
    return <CourseList courses={this.props.courses} />
  }
}

CourseListContainer.propTypes = propTypes;
CourseListContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  courses: getCourses(state),
});

const mapDispatchToProps = {
  onLoadCourse: loadCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListContainer);
