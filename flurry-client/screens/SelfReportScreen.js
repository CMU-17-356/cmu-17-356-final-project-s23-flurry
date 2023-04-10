import React from 'react';
import { View, Text, StyleSheet, TextInput, SectionList } from 'react-native';
import { slipIncidents } from '../data/dummyData';

export default class SelfReportScreen extends React.Component {
  handleDateRangeChange = (startDate, endDate) => {
    // Do something with the selected start and end dates
    //console.log('Selected date range:', startDate, endDate);
  };
  handleDriverSelect = (driverName) => {
    setSelectedDriver(driverName);
  };
//   const [text, onChangeText] = React.useState('Useless Text');
// const [text, setText] = React.useState("");
  render() {
    return (
        <View style={styles.container}> 
        <TextInput
        label="Timestamp"
        value={"text"}
        />

    <TextInput
        label="location"
        value={"text"}
        />

<TextInput
        label="veichle id"
        value={"text"}
        />

<TextInput
        label="slip score"
        value={"text"}
        />


</View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  item: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 10,
  },
});