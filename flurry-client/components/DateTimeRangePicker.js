import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from '@react-native-community/datetimepicker';

const MIN_DATE = new Date(2021, 0, 1);
const MAX_DATE = new Date();

class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: MIN_DATE,
      endDate: MAX_DATE,
      showStartDatePicker: false,
      showEndDatePicker: false,
    };
  }

  onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.startDate;
    this.setState({ startDate: currentDate });
  };

  onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.endDate;
    this.setState({ endDate: currentDate });
  };

  render() {
    const { startDate, endDate, showStartDatePicker, showEndDatePicker } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Text>Start Date: {startDate.toDateString()}</Text>
          <MultiSlider
            values={[startDate.getTime(), endDate.getTime()]}
            sliderLength={300}
            onValuesChange={(values) => {
              this.setState({
                startDate: new Date(values[0]),
                endDate: new Date(values[1]),
              });
            }}
            min={MIN_DATE.getTime()}
            max={MAX_DATE.getTime()}
            step={86400000}
            allowOverlap={false}
            snapped
          />
          <Text>End Date: {endDate.toDateString()}</Text>
        </View>
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="spinner"
            minimumDate={MIN_DATE}
            maximumDate={endDate}
            onChange={this.onStartDateChange}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            mode="date"
            is24Hour={true}
            display="spinner"
            minimumDate={startDate}
            maximumDate={MAX_DATE}
            onChange={this.onEndDateChange}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 150,
    marginHorizontal: 20,
    marginTop: 20,
  },
  dateDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});




export default DateTimeRangePicker;
