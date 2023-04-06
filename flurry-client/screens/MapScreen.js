import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import styles from '../style';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import DateTimePicker from '@react-native-community/datetimepicker';


export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      startMode: 'date',
      startShow: false,
      endDate: new Date(),
      endMode: 'date',
      endShow: false
    };
  }

  onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      startDate: currentDate,
      startShow: false
    });
  };
  onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      endDate: currentDate,
      endShow: false
    });
  };

  showPicker = (mode, isStart) => {
    this.setState({
      startMode:  isStart ? mode : this.state.startMode,
      endMode: isStart ? this.state.endMode : mode,
      startShow: isStart,
      endShow: !isStart
    });
  };

  render() {
    return (
      <View style={styles.container}>

        <Text>Flurry Map</Text>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '40%'
          }}>
            <Text>Start Date</Text>
            <Button onPress={() => this.showPicker('date', true)} title={this.state.startDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})} />
            <Button onPress={() => this.showPicker('time', true)} title={this.state.startDate.toLocaleString([], {hour: '2-digit', minute: '2-digit'})} />
            {this.state.startShow && (
              <View style={{
                flexDirection: 'row',
              }}>
                <Text>Select: </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.startDate}
                  mode={this.state.startMode}
                  is24Hour={true}
                  onChange={this.onStartDateChange}
                />
              </View>
            )}
          </View>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '40%'
          }}>
            <Text>End Date</Text>
            <Button onPress={() => this.showPicker('date', false)} title={this.state.endDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})} />
            <Button onPress={() => this.showPicker('time', false)} title={this.state.endDate.toLocaleString([], {hour: '2-digit', minute: '2-digit'})} />
            {this.state.endShow && (
              <View style={{
                flexDirection: 'row',
              }}>
                <Text>Select: </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.endDate}
                  mode={this.state.endMode}
                  is24Hour={true}
                  onChange={this.onEndDateChange}
                />
              </View>
            )}
          </View>
        </View>

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