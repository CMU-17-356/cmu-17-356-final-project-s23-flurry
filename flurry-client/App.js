import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import AnalyticsScreen from "./screens/AnalyticsScreen";
import MapScreen from "./screens/MapScreen";
import styles from "./style";

export default function App() {
  // TODO? probably want some kind of navigation set up here

  return (
    <View style={styles.container}>
      {/* <MapScreen /> */}
      <AnalyticsScreen />
      <StatusBar style="auto" />
    </View>
  );
}
