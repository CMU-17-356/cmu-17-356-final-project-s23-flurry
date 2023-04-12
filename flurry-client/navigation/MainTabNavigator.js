import React from 'react';
// import { Platform, TouchableHighlight, Text, Alert, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../screens/MapScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

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
              name={'location-outline'}
              size={26}
              style={{ marginBottom: -3 }}
            />
          )
        }}/>
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? "blue" : "gray"}
              name={'analytics'}
              size={26}
              style={{ marginBottom: -3 }}
            />
          )
        }}/> 
    </Tab.Navigator>
  );
}
