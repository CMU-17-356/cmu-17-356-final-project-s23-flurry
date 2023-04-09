import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimeRangePicker from '../components/DateTimeRangePicker';
import DriverDropdown from '../components/DriverDropdown';
import SlipSeverityChart from '../components/SlipSeverityChart';
import { slipIncidents } from '../data/dummyData';

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
      <View style={styles.container}>
        <Text style={styles.title}>Pick a date range for Analytics</Text>
        <DateTimeRangePicker onDateRangeChange={this.handleDateRangeChange} />
        <DriverDropdown onDriverSelect={this.handleDriverSelect} />
        <SlipSeverityChart data={slipIncidents} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
