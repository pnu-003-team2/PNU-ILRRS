import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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

const CourseItem = ({ course, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.course}>
      <View style={styles.courseTopView}>
        <View style={styles.professorBox}>
          <Text >{course.professorName} 교수님</Text>
        </View>
        <RoundLabel color={'#4f54fb'} text={course.classDivision} />
        <RoundLabel color={'#de7924'} text={course.code + ' 분반'} />
      </View>

      <View style = {styles.courseBottomView}>
        <Text style={[styles.courseTitleText, styles.bottomPadding]}>{course.className}</Text>
        <SeperatedText style={styles.coureTimeText} timeTable={course.timeTable}/>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  course: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: 15,
    backgroundColor : 'white',
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal : 30,
    //shadowOffset: '10',
    //elevation: 50,

  },

  courseTopView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
    //backgroundColor: 'red',
  },
  professorBox: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  professorText: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Roboto-Regular',
  },

  courseBottomView:{
    flex:1,
    //backgroundColor: 'blue',
  },
  courseTitleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  coureTimeText:{
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  bottomPadding:{
    paddingBottom: 7,
  },
});

CourseItem.propTypes = propTypes;
CourseItem.defaultProps = defaultProps;

export default CourseItem;
