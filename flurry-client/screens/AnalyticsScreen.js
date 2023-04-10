import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import DateTimeRangePicker from '../components/DateTimeRangePicker';
import DriverDropdown from '../components/DriverDropdown';
import SlipSeverityChart from '../components/SlipSeverityChart';
import { slipIncidents } from '../data/dummyData';

export default class AnalyticsScreen extends React.Component {
  handleDateRangeChange = (startDate, endDate) => {
    // Do something with the selected start and end dates
    //console.log('Selected date range:', startDate, endDate);
  };
  handleDriverSelect = (driverName) => {
    setSelectedDriver(driverName);
  };

  render() {
    return (
      <SectionList
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}
        sections={[
          {
            title: 'Pick a date range for Analytics',
            data: [<DateTimeRangePicker onDateRangeChange={this.handleDateRangeChange} />],
          },
          {
            title: '',
            data: [<DriverDropdown onDriverSelect={this.handleDriverSelect} />],
          },
          {
            title: '',
            data: [<SlipSeverityChart data={slipIncidents} />],
          },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <View style={styles.item}>{item}</View>}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
      />
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