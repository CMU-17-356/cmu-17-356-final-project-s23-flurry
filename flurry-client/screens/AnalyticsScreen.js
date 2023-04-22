import fetch from "node-fetch";
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

import DateTimeRangePicker from "../components/DateTimeRangePicker";
import DriverDropdown from "../components/DriverDropdown";
import SlipSeverityChart from "../components/SlipSeverityChart";
import { slipIncidents } from "../data/dummyData";

export default class AnalyticsScreen extends React.Component {
  state = {
    slips: [],
    selectedDrivers: [],
    error: null,
  };

  componentDidMount() {
    fetch("http://localhost:3000/slips")
      .then((response) => response.json())
      .then((data) => {
        // Extract driver ids from the slips
        const driverIds = [...new Set(data.map((slip) => slip.driver_id))];

        // Fetch driver details for each driver id
        Promise.all(
          driverIds.map((id) =>
            fetch(`http://localhost:3000/drivers/${id}`)
              .then((response) => response.json())
              .then((driver) => ({ id, ...driver }))
          )
        )
          .then((drivers) => {
            // Set the selectedDrivers state variable with the retrieved driver details
            this.setState({ slips: data, selectedDrivers: drivers });
          })
          .catch((error) => this.setState({ error }));
      })
      .catch((error) => this.setState({ error }));
  }
  handleDateRangeChange = (startDate, endDate) => {
    // Do something with the selected start and end dates
    //console.log('Selected date range:', startDate, endDate);
  };
  setSelectedDriver = (driverName) => {
    // TODO: put something in here @Meghana
  };

  handleDriverSelect = (driverName) => {
    this.setSelectedDriver(driverName);
  };

  render() {
    return (
      <SectionList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        sections={[
          {
            title: "Pick a date range for Analytics",
            data: [
              <DateTimeRangePicker
                onDateRangeChange={this.handleDateRangeChange}
              />,
            ],
          },
          {
            title: "",
            data: [
              <DriverDropdown
                onDriverSelect={this.handleDriverSelect}
                drivers={this.state.selectedDrivers}
                slips = {this.state.slips}
              />,
            ],
          },
          {
            title: "",
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  item: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 10,
  },
});
