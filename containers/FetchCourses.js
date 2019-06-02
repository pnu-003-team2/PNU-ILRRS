import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCourse } from '../state/course/actions';

const propTypes = {
  onLoadCourse: PropTypes.func,
};

const defaultProps = {
  onLoadCourse() {},
};

class FetchCourses extends React.Component {
  componentDidMount() {
    this.props.onLoadCourse();
  }

  render() {
    return null;
  }
}

FetchCourses.propTypes = propTypes;
FetchCourses.defaultProps = defaultProps;

const mapDispatchToProps = {
  onLoadCourse: loadCourse,
};

export default connect(null, mapDispatchToProps)(FetchCourses);
