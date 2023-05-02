import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import AnalyticsScreen from "./screens/AnalyticsScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import SelfReportScreen from "./screens/SelfReportScreen";

import styles from "./style";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MapScreen /> */}
      {/* <AnalyticsScreen /> */}
      <SelfReportScreen />
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}
