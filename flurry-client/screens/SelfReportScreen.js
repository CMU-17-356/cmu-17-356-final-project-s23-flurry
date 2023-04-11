import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { slipIncidents } from '../data/dummyData';

export default class SelfReportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          timestamp: new Date(),
          location: "date",
          vehicleID: 1,
          slipScore: 0
        };
      }
    

      onSlipScoreChange = (event, selectedScore) => {
        const currentscore = selectedScore;
        this.setState({
            slipScore: currentscore,
        });
      };

      onLocationChange = (event, selectedLocation) => {
        const currentLocation = selectedLocation;
        this.setState({
            location: currentLocation,
        });
      };


      onVehicleIDChange = (event, selectedVehicle) => {
        const currentVehicle = selectedVehicle;
        this.setState({
            vehicleID: currentVehicle,
        });
      };

      handleSubmit = () => {
        // Do something with the form data, e.g. send it to a server
        console.log(`Input 1 value: ${this.timestamp}`);
        console.log(`Input 2 value: ${this.location}`);
        console.log(`Input 3 value: ${this.vehicleID}`);
        console.log(`Input 4 value: ${this.slipScore}`);
      };
    

  
  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Form Screen</Text>
        <View style={styles.inputContainer}>
        <Text>Timestamp: </Text>
          <TextInput
            style={styles.input}
            placeholder="timestamp"
            value={this.state.timestamp}
            // onChangeText={handleInput1Change}
          />
           <Text>Location: </Text>
          <TextInput
            style={styles.input}
            placeholder="location"
            value={this.state.location}
            onChangeText={this.onLocationChange}
          />
          <Text>Vehicle ID: </Text>
          <TextInput
            style={styles.input}
            placeholder="vehicleID"
            value={this.state.vehicleID}
            onChangeText={this.onVehicleIDChange}
          />
          <Text>Slip Score: </Text>
          <TextInput
            style={styles.input}
            placeholder="slipScore"
            value={this.state.slipScore}
            onChangeText={this.onSlipScoreChange}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
      color: '#333',
    },
    inputContainer: {
      marginTop: 20,
      width: '90%', // updated width
      paddingHorizontal: 20,
    },
    input: {
      backgroundColor: '#eee',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 18,
    },
  });
  