import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  state = {
    items: {},
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2019-04-23'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        this
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              classDivision: '063',
              className: '운영체제',
              timeTable: '13:30-14:45',
              roomNumber: '201-6208',
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: 150 }]}>
        <Text>{item.timeTable}</Text>
        <Text style={styles.className}>{item.className} ({item.classDivision})</Text>
        <Text style={styles.roomNumber}>{item.roomNumber}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return null;
  }

  rowHasChanged(r1, r2) {
    return r1.className !== r2.className;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-evenly',
  },
  className: {
    fontSize: 25,
  },
  roomNumber: {
    fontSize: 14,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
