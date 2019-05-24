import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import SeperatedText from '../components/SeperatedText';

const propTypes = {
  course: PropTypes.shape({
    className: PropTypes.string,
    classDivision: PropTypes.string,
    code: PropTypes.number,
    id: PropTypes.number.isRequired,
    professorName: PropTypes.string,
    timeTable: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress() {},
};

const CourseItem = ({ course, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.course}>
      <View style={styles.coureLeftView}>
        <Text style={[styles.titleText, styles.bottomPadding]}>{course.className}</Text>
        <Text style={course.classDivision.includes('전공') ? [styles.redText,styles.bottomPadding] : [styles.grayText,styles.bottomPadding]}>
          {course.classDivision}
        </Text>
        <Text style={[styles.codeText]}>{course.code} 분반</Text>
        <SeperatedText timeTable={course.timeTable}/>
      </View >
      <View style={styles.courseRightView}>
        <Text style={styles.professorNameText}>{course.professorName} 교수님</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  course: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'skyblue',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  coureLeftView: {
    flex: 3,
    flexDirection: 'column',
  },
  courseRightView:{
    flex: 1,

  },
  professorNameText: {
    fontSize: 13,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 19,
  },
  bottomPadding: {
    paddingBottom : 16,
  },
  redText: {
    color:  'red',
  },
  grayText: {
    color:  'gray',
  },
  codeText: {
    color : 'gray',
    paddingBottom: 4,
  },
});

CourseItem.propTypes = propTypes;
CourseItem.defaultProps = defaultProps;

export default CourseItem;
