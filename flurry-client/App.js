import { StatusBar } from "expo-status-bar";
// import { Text, View } from "react-native";

// import AnalyticsScreen from "./screens/AnalyticsScreen";
// import MapScreen from "./screens/MapScreen";
import MainTabNavigator from "./navigation/MainTabNavigator"
import { NavigationContainer } from '@react-navigation/native';
import styles from "./style";

export default function App() {

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
