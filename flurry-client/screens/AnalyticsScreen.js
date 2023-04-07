import React from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimeRangePicker from '../components/DateTimeRangePicker';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <DateTimeRangePicker />
      
      {/* Add your other analytics components below */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
});
