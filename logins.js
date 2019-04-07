import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends Component {
   state = {
      studentId: '',
      password: ''
   }
   handleStudentId = (text) => {
      this.setState({ studentId: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (studentId, pass) => {
      alert('studentId: ' + studentId + ' password: ' + pass)
   }
   render() {
      return (
         <View style = {styles.container}>
            <Text style = {styles.headerText}> 학번 </Text>
            <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "학번을 입력해주세요"
                placeholderTextColor = "#c8c8c8"
                onChangeText = {this.handleStudentId}/>
            <Text style = {styles.headerText}> 비밀번호 </Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "비밀번호를 입력해주세요"
               placeholderTextColor = "#c8c8c8"
               onChangeText = {this.handlePassword}/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.studentId, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> 로그인 </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   headerText: {
      marginLeft: 15,
      height: 20
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#f8c224',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#f8c224',
      padding: 10,
      margin: 15,
      height: 40
   },
   submitButtonText:{
      textAlign: 'center',
      color: 'white',
   }
})