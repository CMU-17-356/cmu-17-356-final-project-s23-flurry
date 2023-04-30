/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import SelfReportScreen from "./screens/SelfReportScreen";
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
