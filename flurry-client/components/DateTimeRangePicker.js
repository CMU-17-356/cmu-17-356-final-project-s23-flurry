import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

class DateTimeRangePicker extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      isStartDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndDatePickerVisible: false,
      isEndTimePickerVisible: false,
      startDate: new Date(2000, 0, 1, 0, 0),
      endDate: currentDate,
    };
  }

  showStartDatePicker = () => {
    this.setState({ isStartDatePickerVisible: true });
  };

  hideStartDatePicker = () => {
    this.setState({ isStartDatePickerVisible: false });
  };

  handleStartDateConfirm = (date) => {
    this.setState({ 
      startDate: date,
      isStartDatePickerVisible: false
    }, () => {
      this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
    });
  };

  showStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: true });
  };

  hideStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: false });
  };

  handleStartTimeConfirm = (time) => {
    const { startDate } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const newStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      hours,
      minutes
    );
    this.setState({ 
      startDate: newStartDate,
      isStartTimePickerVisible: false
    }, () => {
      this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
    });
  };

  showEndDatePicker = () => {
    this.setState({ isEndDatePickerVisible: true });
  };

  hideEndDatePicker = () => {
    this.setState({ isEndDatePickerVisible: false });
  };

  handleEndDateConfirm = (date) => {
    this.setState({ 
      endDate: date,
      isEndDatePickerVisible: false
    }, () => {
      this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
    });
  };

  showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  };

  hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  };

  handleEndTimeConfirm = (time) => {
    const { endDate } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const newEndDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      hours,
      minutes
    );
    this.setState({ 
      endDate: newEndDate,
      isEndTimePickerVisible: false
    }, () => {
      this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
    });
  };

  render() {
    const { startDate, endDate } = this.state;
    const startDateFormat = startDate.toDateString();
    const startTimeFormat = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endDateFormat = endDate.toDateString();
    const endTimeFormat = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={this.showStartDatePicker}>
            <Text style={styles.pickerText}>Start Date: {startDateFormat}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={this.state.isStartDatePickerVisible}
            mode="date"
            onConfirm={this.handleStartDateConfirm}
            onCancel={this.hideStartDatePicker}
            date={this.state.startDate}
          />
        </View>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={this.showStartTimePicker}>
            <Text style={styles.pickerText}>Start Time: {startTimeFormat}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={this.state.isStartTimePickerVisible}
            mode="time"
            onConfirm={this.handleStartTimeConfirm}
            onCancel={this.hideStartTimePicker}
            date={new Date()}
            headerTextIOS="Pick a Start Time"
            minuteInterval={1}
            locale="en_GB"
            is24Hour
            display="spinner"
            continueText="Select"
          />
        </View>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={this.showEndDatePicker}>
            <Text style={styles.pickerText}>End Date: {endDateFormat}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={this.state.isEndDatePickerVisible}
            mode="date"
            onConfirm={this.handleEndDateConfirm}
            onCancel={this.hideEndDatePicker}
            date={this.state.endDate}
          />
        </View>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={this.showEndTimePicker}>
            <Text style={styles.pickerText}>End Time: {endTimeFormat}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={this.state.isEndTimePickerVisible}
            mode="time"
            onConfirm={this.handleEndTimeConfirm}
            onCancel={this.hideEndTimePicker}
            date={new Date()}
            headerTextIOS="Pick an End Time"
            minuteInterval={1}
            locale="en_GB"
            is24Hour
            display="spinner"
            continueText="Select"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pickerText: {
    fontSize: 16,
    color: "#007aff",
  },
});

export default DateTimeRangePicker;
