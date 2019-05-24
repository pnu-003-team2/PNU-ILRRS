import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import CourseList from '../components/CourseList';
import { getCourses, loadCourse } from '../state/course';

const propTypes = {
  courses: PropTypes.array,
  onCoursePress: PropTypes.func,
};

const defaultProps = {
  courses: [],
  onCoursePress() {},
};

class CourseListContainer extends React.Component {
  componentDidMount() {
    try {
      this.props.onLoadCourse();
    } catch (error) {
      const message = error.message || '잠시 후 다시 시도해주세요.';
      Alert.alert('강의목록 불러오기 실패', message, [
        { text: 'OK' },
      ],
      { cancelable: false });
    }
  }

  render() {
    const { courses, onCoursePress } = this.props;
    return <CourseList courses={courses} onCoursePress={onCoursePress} />;
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
