import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SelfReportScreen from './screens/SelfReportScreen'
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import AnalyticsScreen from "./screens/AnalyticsScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import styles from "./style";

export default function App() {
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
