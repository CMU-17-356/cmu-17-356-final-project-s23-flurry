import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import DriverTabNavigator from "./navigation/DriverTabNavigator";
import MainStackNavigator from "./navigation/MainStackNavigator";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import SelfReportScreen from "./screens/SelfReportScreen";
import styles from "./style";

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MainStackNavigator />
    </NavigationContainer>
    // <View style={styles.container}>
    //   {/* <SelfReportScreen />
    //   <AnalyticsScreen /> */}
    //   {/* <MapScreen /> */}
    //   <LoginScreen />
    //   <StatusBar style="auto" />
    // </View>
  );
}
