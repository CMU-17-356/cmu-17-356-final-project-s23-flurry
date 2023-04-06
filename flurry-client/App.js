import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import MapScreen from "./screens/MapScreen";
import styles from "./style";

export default function App() {
  // TODO? probably want some kind of navigation set up here

  return (
    <View style={styles.container}>
      <MapScreen />
      <StatusBar style="auto" />
    </View>
  );
}
