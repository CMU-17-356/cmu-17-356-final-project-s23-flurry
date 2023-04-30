import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// import { Platform, TouchableHighlight, Text, Alert, View } from 'react-native';
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();
export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Slip Incident Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? "blue" : "gray"}
              name={"location-outline"}
              size={26}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? "blue" : "gray"}
              name={"analytics"}
              size={26}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
