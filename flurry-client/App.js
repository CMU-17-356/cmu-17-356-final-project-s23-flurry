import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SelfReportScreen from './screens/SelfReportScreen'
import AnalyticsScreen from "./screens/AnalyticsScreen";
import MapScreen from "./screens/MapScreen";
import styles from "./style";

export default function App() {
  // TODO? probably want some kind of navigation set up here

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <SelfReportScreen />
      {/* <MapScreen /> */}
      {/* <AnalyticsScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}
