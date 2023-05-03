// import fetch from "node-fetch";
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

import DateTimeRangePicker from "../components/DateTimeRangePicker";
import DriverDropdown from "../components/DriverDropdown";
import SlipSeverityChart from "../components/SlipSeverityChart";

export default class AnalyticsScreen extends React.Component {
  state = {
    slips: [],
    selectedDrivers: [],
    error: null,
  };

  componentDidMount() {
    fetch("https://flurry-backend.fly.dev/api/slips")
      .then((response) => response.json())
      .then((data) => {
        // Extract driver ids from the slips
        const driverIds = [...new Set(data.map((slip) => slip.driver_id))];

        // Fetch driver details for each driver id
        Promise.all(
          driverIds.map((id) =>
            fetch(`https://flurry-backend.fly.dev/api/drivers/${id}`)
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

  handleDriverSelect = (driverId) => {
    //using this driver id, get all rows where slip.driver_id == driverId.
    const filteredSlips = this.state.slips.filter(
      (slip) => slip.driver_id === driverId
    );
    // Do something with the filtered slips
  };

  render() {
    return (
      <SectionList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        sections={[
          {
            title: "",
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
                onSelectDriver={this.handleDriverSelect}
                drivers={this.state.selectedDrivers}
                slips={this.state.slips}
              />,
            ],
          },
          {
            title: "",
            data: [<SlipSeverityChart data={this.state.slips} />],
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
