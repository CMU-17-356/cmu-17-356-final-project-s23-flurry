// import fetch from "node-fetch";
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

import DateTimeRangePicker from "../components/DateTimeRangePicker";
import DriverDropdown from "../components/DriverDropdown";
import SlipSeverityChart from "../components/SlipSeverityChart";

export default class AnalyticsScreen extends React.Component {
  state = {
    slips: [],
    drivers: [],
    error: null,
    conditions: {
      company_id: null,
      after: null,
      before: null,
    },
  };

  componentDidMount() {
    const { username } = this.props;
    // fetch company first
    console.log("bruhhh", username)
    fetch(`https://flurry-backend.fly.dev/api/drivers/${username}`)
      .then((response) => response.json())
      .then((manager) => {
        this.setState(prevState => ({
          ...prevState,
          conditions: {
            ...prevState.conditions,
            company_id: manager.company_id,
          },
        }), () => {
          console.log(this.state.conditions)
          // re-fetch all drivers slips
          this.refreshDrivers()
          this.refreshSlips()
        });
      })
      .catch((error) => this.setState({ error }));
  }

  refreshDrivers() {
    // refresh drivers
    fetch("https://flurry-backend.fly.dev/api/drivers")
      .then((response) => response.json())
      .then((drivers) => {
        this.setState(prevState => ({
          ...prevState,
          drivers: drivers,
        }));
      })
      .catch((error) => this.setState({ error }));
  }

  refreshSlips() {
    let conditions = "?"
    if (this.state.conditions.company_id != null) {
      conditions += "company_id=" + this.state.conditions.company_id + "&"
    }
    if (this.state.conditions.after != null) {
      conditions += "after=" + this.state.conditions.after + "&"
    }
    if (this.state.conditions.before != null) {
      conditions += "before=" + this.state.conditions.before + "&"
    }
    conditions = conditions.slice(0, -1)

    // refresh slips
    fetch(`https://flurry-backend.fly.dev/api/slips${conditions}`)
      .then((response) => response.json())
      .then((slips) => {
        this.setState(prevState => ({
          ...prevState,
          slips: slips,
        }));
      })
      .catch((error) => this.setState({ error }));
  }

  handleDateRangeChange = (startDate, endDate) => {
    this.setState(prevState => ({
      ...prevState,
      conditions: {
        ...prevState.conditions,
        after: startDate.getTime(),
        before: endDate.getTime(),
      }
    }), () => {
      this.refreshSlips()
    });
  };

  // NOT filtering slips here when driver is selected
  handleDriverSelect = (driver_id) => {
    // this.setState(prevState => ({
    //   ...prevState,
    //   conditions: {
    //     ...prevState.conditions,
    //     driver_id: driverId,
    //   }
    // }), () => {
    //   this.refreshSlips()
    // });
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
                drivers={this.state.drivers}
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
