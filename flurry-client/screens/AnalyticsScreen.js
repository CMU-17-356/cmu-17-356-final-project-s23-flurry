import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimeRangePicker from '../components/DateTimeRangePicker';
import DriverDropdown from '../components/DriverDropdown';


export default class AnalyticsScreen extends React.Component {
  handleDateRangeChange = (startDate, endDate) => {
    // Do something with the selected start and end dates
    console.log('Selected date range:', startDate, endDate);
  };
  handleDriverSelect = (driverName) => {
    setSelectedDriver(driverName);
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Pick a date range for Analytics</Text>
        <DateTimeRangePicker onDateRangeChange={this.handleDateRangeChange} />
        <DriverDropdown onDriverSelect={this.handleDriverSelect} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
