import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './style';
import MapScreen from './screens/MapScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'

export default function App() {

  // TODO? probably want some kind of navigation set up here


  return (
    <View style={styles.container}>
      
      {/* 
      <MapScreen />
    */}
    <AnalyticsScreen />
      <StatusBar style="auto" />
    </View>
  );
}
