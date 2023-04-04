import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../style';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'


export default class MapScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <Text>Flurry Map</Text>
        <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        zoomControlEnabled={true} /> 
      </View>
    );
  }
}