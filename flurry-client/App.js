import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import MainTabNavigator from "./navigation/MainTabNavigator";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import SelfReportScreen from "./screens/SelfReportScreen";
import styles from "./style";

export default function App() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
    // <View style={styles.container}>
    //   <SelfReportScreen />
    //   <AnalyticsScreen />
    //   <StatusBar style="auto" />
    // </View>
    //   {/* <MapScreen /> */}
    //   {/* <LoginScreen /> */}
      
  );
}