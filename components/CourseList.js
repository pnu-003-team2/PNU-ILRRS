import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, View } from 'react-native';


function SepearatedText({ timeTable }) {
  let [firstLine,secondLine] = timeTable.split(',',2);
  
  return (
    <View>
      <Text>{firstLine}</Text>
      <Text>{secondLine}</Text>
    </View>
  );
}


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

function CourseList({ courses }) {
  return (
    <FlatList
      data={courses.map(course => ({ ...course, key: course.id.toString() }))}
      renderItem={({ item }) => (
        <View style={styles.course}>
          <View style={styles.coureLeftView}>
            <Text style={[styles.titleText, styles.bottomPadding]}>{item.className}</Text>
            <Text style={item.classDivision.includes('전공') ? [styles.redText,styles.bottomPadding] : [styles.grayText,styles.bottomPadding]}>{item.classDivision}</Text>
            <Text style={[styles.codeText]}>{item.code} 분반</Text>
            <SepearatedText timeTable={item.timeTable}/>
          </View >
          <View style={styles.courseRightView}>
            <Text style={styles.professorNameText}>{item.professorName} 교수님</Text>
          </View>
        </View>
      )}
    />
  );
}


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

CourseList.propTypes = propTypes;
CourseList.defaultProps = defaultProps;
export default CourseList;

