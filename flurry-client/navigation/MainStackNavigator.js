import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";

// import { Platform, TouchableHighlight, Text, Alert, View } from 'react-native';
import DriverTabNavigator from "./DriverTabNavigator";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";
import SelfReportScreen from "../screens/SelfReportScreen";

const Stack = createStackNavigator();
export default function MainStackNavigator() {
  const [username, setUsername] = useState('');

  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={LoginScreen} /> */}
      <Stack.Screen name="Home">
        {props => <LoginScreen {...props} setUsername={setUsername} />}
      </Stack.Screen>
      <Stack.Screen name="Driver Info" component={DriverTabNavigator} />
      {/* <Stack.Screen name="Analytics" component={AnalyticsScreen} /> */}
      <Stack.Screen name="Analytics">
        {props => <AnalyticsScreen {...props} username={username} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
