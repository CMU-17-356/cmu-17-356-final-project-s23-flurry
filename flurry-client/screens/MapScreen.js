import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../style';
import MapView, { Marker } from 'react-native-maps';
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
        zoomControlEnabled={true} 
        initialRegion={{
          latitude: 40.443652, 
          longitude: -79.942840,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

          <Marker
            coordinate={{
              latitude: 40.449332, 
              longitude: -79.951451}}
            pinColor = {"purple"}
            title={"Example Marker"}
            description={"Slip Score: ??"}
         />

        </MapView> 
      </View>
    );
  }
}