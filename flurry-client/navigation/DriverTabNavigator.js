import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// import { Platform, TouchableHighlight, Text, Alert, View } from 'react-native';
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapScreen from "../screens/MapScreen";
import SelfReportScreen from "../screens/SelfReportScreen";
import styles from "../style";

const Tab = createBottomTabNavigator();
export default function DriverTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Slip Incident Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? styles.themedBlue : "gray"}
              name={"location-outline"}
              size={26}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Self-Report"
        component={SelfReportScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? styles.themedBlue : "gray"}
              name={"report"}
              size={26}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
