import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import SeperatedText from '../components/SeperatedText';
import RoundLabel from '../components/RoundLabel';

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

const CourseItem = ({ course, onPress, style }) => (
  <TouchableWithoutFeedback onPress={() => onPress(course.id)}>
    <View style={[styles.conatiner, style]}>
      <View style={styles.topContainer}>
        <View style={styles.professorContainer}>
          <Text style={styles.professor}>{course.professorName} 교수님</Text>
        </View>
        <View style={styles.labelContainer}>
          <RoundLabel
            color={'#4f54fb'}
            text={course.classDivision}
          />
          <RoundLabel
            color={'#de7924'}
            text={course.code + ' 분반'}
          />
        </View>
      </View>

      <View style = {styles.courseBottomView}>
        <Text style={[styles.courseTitleText, styles.bottomPadding]}>{course.className}</Text>
        <SeperatedText style={styles.coureTimeText} timeTable={course.timeTable}/>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor : 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  professorContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  labelContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  professor: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Roboto-Regular',
  },
  courseBottomView:{
    flex:1,
  },
  courseTitleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 12,
  },
  coureTimeText:{
    fontFamily: 'Roboto-Regular',
  },
});

CourseItem.propTypes = propTypes;
CourseItem.defaultProps = defaultProps;

export default CourseItem;
