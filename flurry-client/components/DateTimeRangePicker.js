import MultiSlider from "@ptomasroos/react-native-multi-slider";
import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      startMode: "date",
      startShow: false,
      endDate: new Date(),
      endMode: "date",
      endShow: false,
    };
  }

  onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      startDate: currentDate,
      startShow: false,
    });
  };
  onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      endDate: currentDate,
      endShow: false,
    });
  };

  showPicker = (mode, isStart) => {
    this.setState({
      startMode: isStart ? mode : this.state.startMode,
      endMode: isStart ? this.state.endMode : mode,
      startShow: isStart,
      endShow: !isStart,
    });
  };


  handleValuesChange = (values) => {
    const [start, end] = values;
    this.setState({
      startDate: moment(MIN_DATE).add(start, "days").toDate(),
      endDate: moment(MIN_DATE).add(end, "days").toDate(),
    });

    // Call the onDateRangeChange prop with the selected start and end dates
    this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
  };

  formatRangeText = () => {
    const { startDate, endDate } = this.state;
    const formattedStartDate = moment(startDate).format("MMM DD, YYYY");
    const formattedEndDate = moment(endDate).format("MMM DD, YYYY");
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  render() {
    return (
    <View
  style={{
    flexDirection: "row",
  }}
>
  <View
    style={{
      flexDirection: "column",
      alignItems: "center",
      width: "40%",
    }}
  >
    <Text>Start Date</Text>
    <Button
      onPress={() => this.showPicker("date", true)}
      title={this.state.startDate.toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}
    />
    <Button
      onPress={() => this.showPicker("time", true)}
      title={this.state.startDate.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    />
    {this.state.startShow && (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>Select: </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.startDate}
          mode={this.state.startMode}
          is24Hour={true}
          onChange={this.onStartDateChange}
        />
      </View>
    )}
  </View>
  <View
    style={{
      flexDirection: "column",
      alignItems: "center",
      width: "40%",
    }}
  >
    <Text>End Date</Text>
    <Button
      onPress={() => this.showPicker("date", false)}
      title={this.state.endDate.toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}
    />
    <Button
      onPress={() => this.showPicker("time", false)}
      title={this.state.endDate.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    />
    {this.state.endShow && (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>Select: </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.endDate}
          mode={this.state.endMode}
          is24Hour={true}
          onChange={this.onEndDateChange}
        />
      </View>
    )}
  </View>
</View>
);
}

}

