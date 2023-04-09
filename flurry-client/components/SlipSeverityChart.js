import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function SlipSeverityChart(props) {
  const { data } = props;

  const slipCount = {
    3: 0,
    5: 0,
    7: 0,
    10: 0,
  };

  data.forEach((slip) => {
    if (slip.slipSeverity <= 3) {
      slipCount[3]++;
    } else if (slip.slipSeverity <= 5) {
      slipCount[5]++;
    } else if (slip.slipSeverity <= 7) {
      slipCount[7]++;
    } else if (slip.slipSeverity <= 10) {
      slipCount[10]++;
    }
  });

  const chartData = [
    {
      name: 'Severity <= 3',
      count: slipCount[3],
      color: '#2ecc71',
      legendFontColor: '#2ecc71',
    },
    {
      name: 'Severity <= 5',
      count: slipCount[5],
      color: '#3498db',
      legendFontColor: '#3498db',
    },
    {
      name: 'Severity <= 7',
      count: slipCount[7],
      color: '#f1c40f',
      legendFontColor: '#f1c40f',
    },
    {
      name: 'Severity <= 10',
      count: slipCount[10],
      color: '#e74c3c',
      legendFontColor: '#e74c3c',
    },
  ];

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
