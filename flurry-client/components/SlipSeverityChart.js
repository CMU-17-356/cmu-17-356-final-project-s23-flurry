import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function SlipSeverityChart(props) {
  const { data } = props;

  const slipCount = {
    30: 0,
    50: 0,
    70: 0,
    100: 0,
  };

  data.forEach((slip) => {
    if (slip.slip_score <= 30) {
      slipCount[30]++;
    } else if (slip.slip_score <= 50) {
      slipCount[50]++;
    } else if (slip.slip_score <= 70) {
      slipCount[70]++;
    } else if (slip.slip_score <= 100) {
      slipCount[100]++;
    }
  });

  const chartData = [
    {
      name: 'Severity <= 30',
      count: slipCount[30],
      color: '#2ecc71',
      legendFontColor: '#2ecc71',
    },
    {
      name: 'Severity <= 50',
      count: slipCount[50],
      color: '#3498db',
      legendFontColor: '#3498db',
    },
    {
      name: 'Severity <= 70',
      count: slipCount[70],
      color: '#f1c40f',
      legendFontColor: '#f1c40f',
    },
    {
      name: 'Severity <= 100',
      count: slipCount[100],
      color: '#e74c3c',
      legendFontColor: '#e74c3c',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slip Severity Distribution</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});