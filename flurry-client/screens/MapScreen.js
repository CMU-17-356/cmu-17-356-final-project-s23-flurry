import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Button, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { slipIncidents } from "../data/dummyData";
import styles from "../style";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    const initStartDate = new Date("2020-12-31T12:00:00");
    const initEndDate = new Date();
    this.state = {
      startDate: initStartDate,
      startMode: "date",
      startShow: false,
      endDate: initEndDate,
      endMode: "date",
      endShow: false,
      markers: this.refreshMarkersList(initStartDate, initEndDate),
    };
  }

  refreshMarkersList(startDate, endDate) {
    const newMarkerList = [];
    slipIncidents.forEach((incident) => {
      if (incident.timestamp <= endDate && incident.timestamp >= startDate) {
        newMarkerList.push({
          title: "Slip score: " + incident.slip_score,
          coordinates: {
            latitude: incident.latitude,
            longitude: incident.longitude,
          },
          description:
            "Driver: " +
            incident.driver_id +
            "\n" +
            incident.timestamp.toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
        });
      }
    });
    return newMarkerList;
  }

  onStartDateChange = (_event, selectedDate) => {
    this.setState({
      startDate: selectedDate,
      startShow: false,
      markers: this.refreshMarkersList(selectedDate, this.state.endDate),
    });
  };
  onEndDateChange = (_event, selectedDate) => {
    this.setState({
      endDate: selectedDate,
      endShow: false,
      markers: this.refreshMarkersList(this.state.startDate, selectedDate),
    });
  };

  showPicker = (mode, isStart) => {
    this.setState({
      startMode: isStart ? mode : this.state.startMode,
      endMode: isStart ? this.state.endMode : mode,
      startShow: isStart,
      endShow: !isStart,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Filter markers:</Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Text>Start Date</Text>
            <Button
              onPress={() => this.showPicker("date", true)}
              title={this.state.startDate.toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            />
            <Button
              onPress={() => this.showPicker("time", true)}
              title={this.state.startDate.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            {this.state.startShow && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
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
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Text>End Date</Text>
            <Button
              onPress={() => this.showPicker("date", false)}
              title={this.state.endDate.toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            />
            <Button
              onPress={() => this.showPicker("time", false)}
              title={this.state.endDate.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            {this.state.endShow && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
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
            longitude: -79.94284,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.markers.map((marker, ind) => (
            <Marker
              key={ind}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              pinColor={styles.themedBlue}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
