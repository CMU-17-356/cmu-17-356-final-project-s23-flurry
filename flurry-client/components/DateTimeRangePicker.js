import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import moment from 'moment';

const MIN_DATE = moment('2021-01-01', 'YYYY-MM-DD').toDate();
const MAX_DATE = moment().toDate();
export default class DateTimeRangePicker extends React.Component {
  state = {
    startDate: MIN_DATE,
    endDate: MAX_DATE,
  };

  handleValuesChange = (values) => {
    const [start, end] = values;
    this.setState({
      startDate: moment(MIN_DATE).add(start, 'days').toDate(),
      endDate: moment(MIN_DATE).add(end, 'days').toDate(),
    });

    // Call the onDateRangeChange prop with the selected start and end dates
    this.props.onDateRangeChange(this.state.startDate, this.state.endDate);
  };

  formatRangeText = () => {
    const { startDate, endDate } = this.state;
    const formattedStartDate = moment(startDate).format('MMM DD, YYYY');
    const formattedEndDate = moment(endDate).format('MMM DD, YYYY');
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  render() {
    const { startDate, endDate } = this.state;
    const startDays = moment(endDate).diff(MIN_DATE, 'days');
    const endDays = moment(MAX_DATE).diff(startDate, 'days');
    return (
      <View style={styles.container}>
        
        <MultiSlider
          values={[0, startDays + endDays]}
          sliderLength={250}
          onValuesChange={this.handleValuesChange}
          min={0}
          max={startDays + endDays}
          allowOverlap={false}
          snapped
          markerStyle={styles.sliderMarkerStyle}
          selectedStyle={styles.sliderSelectedStyle}
          unselectedStyle={styles.sliderUnselectedStyle}
          trackStyle={styles.sliderTrackStyle}
        />
        <View style={styles.rangeTextContainer}>
          <Text style={styles.rangeText}>{this.formatRangeText()}</Text>
        </View>
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
  sliderMarkerStyle: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  sliderSelectedStyle: {
    backgroundColor: 'blue',
  },
  sliderUnselectedStyle: {
    backgroundColor: 'lightblue',
  },
  sliderTrackStyle: {
    height: 4,
    backgroundColor: 'lightgray',
  },
  rangeTextContainer: {
    marginTop: 10,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
