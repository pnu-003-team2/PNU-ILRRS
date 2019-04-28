import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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
          <Text>{item.className} ({item.code}분반) / {item.classDivision} / {item.professorName}</Text>
          <Text>{item.timeTable}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  course: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});

CourseList.propTypes = propTypes;
CourseList.defaultProps = defaultProps;

export default CourseList;
