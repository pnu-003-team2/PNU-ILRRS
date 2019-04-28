import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
  } from 'react-native';

class CourseListScreen extends Component {

        constructor(props) {
          super(props);
          this.state = {
            data: [
              {
                key : "0",
                name : "컴퓨터시각개론",
                professor: "차의영",
                courseCategory:"전공 선택",
                classNum: '059',
              },
              {
                key : "1",
                name: "이태리어",
                professor: "김영숙",
                courseCategory: '일반 선택',
                classNum: '001'
              },
              {
                key : "2",
                name: "공학윤리",
                professor: "이기준",
                courseCategory:'전공 선택',
                classNum: '007'
              },
              {
                key : "3",
                name : "컴퓨터응용설계및실험",
                professor: "채흥석",
                courseCategory: '전공 필수',
                classNum: '003'
            },
            ]
          };
        }

    static navigationOptions = {
        title: '강의 목록',
      };
      
    render() {
        return (
            <View style={styles.container}>
            <FlatList  data= {this.state.data} renderItem={this._renderItem} />
          </View>
        );
    }

    _renderItem = data => {
        return (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View>
                <Text style={styles.titleText}>{data.item.name}</Text>
              </View>
              <View>
                <Text></Text>
                <Text style={styles.smallText}>{data.item.courseCategory} </Text>
                <Text></Text>
                <Text style={styles.infoText}>201 - 6202   {data.item.classNum} 분반 </Text>
                <Text style={styles.infoText}>월 12:30 ~ 2:30 , 수 12:30 ~ 2:30</Text>
              </View>
            </View> 
            <View style={styles.rowRight}>
              <Text style={styles.professorText}>{data.item.professor} 교수님</Text>    
            </View>
          </View>
         )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',

    },
    row:{
      flexDirection: 'row',
      alignItems: 'stretch',
      borderBottomColor: "#f1f1f1",
      borderBottomWidth: 1,

    },
    rowLeft: {
      flex:3,
      padding: 30,
      flexDirection: 'column',

    },
    
    rowRight: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 20,
    },
    
    titleText: {
      fontStyle: 'italic',
      fontWeight: '600',
      fontSize: 18,
    },
    smallText:{
      color: 'red',
      fontSize: 15

    },
    infoText:{
        color: 'gray'
    },
    professorText :{
        fontSize: 13,
    }
  });

export default CourseListScreen;
