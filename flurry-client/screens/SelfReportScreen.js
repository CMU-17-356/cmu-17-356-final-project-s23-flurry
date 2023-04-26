/* eslint-disable object-shorthand */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/order

import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { usePosition } from 'use-position';
import * as Location from 'expo-location';
// import request from 'supertest';
// import { app, server } from '../../src/index.js';
import axios from 'axios';

function MyForm() {
  // Get default values for timestamp and location
  const defaultTimestamp = new Date().toLocaleString();

  // Use geolocation-utils to get user's location
  // const { latitude, longitude } = usePosition();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // console.log(location);
  // Set up state for form inputs
  const [vehicleId, setVehicleId] = useState('');
  const [slipScore, setSlipScore] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // console.log(latitude, longitude);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create object with form data
    const formData = {
      timestamp: new Date(defaultTimestamp),
      latitude: latitude,
      longitude: longitude,
      // location: `${latitude}, ${longitude}`,
      driver_id: vehicleId,
      slip_score: slipScore,
    };

    // Do something with form data here (e.g. send to server)
    console.log(formData);
    // Send form data to backend
    // axios.post('https://example.com/api/form', formData)
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    // const response = await request(app)
    //   .post('/user')
    //   .send(formData)
    //   .expect(201);

    //   expect(response.body).toHaveProperty('id');
    //   expect(response.body.timestamp).toBe(formData.timestamp);
    axios.post('/api/submit-data', formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });

    };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timestamp:</Text>
      <TextInput style={styles.input} value={defaultTimestamp} editable={false} />

      <Text style={styles.label}>Location:</Text>
      <TextInput style={styles.input} value={`${latitude}, ${longitude}`} editable={false} />

      <Text style={styles.label}>Vehicle ID:</Text>
      <TextInput
        style={styles.input}
        value={vehicleId}
        onChangeText={setVehicleId}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Slip Score:</Text>
      <TextInput
        style={styles.input}
        value={slipScore}
        onChangeText={setSlipScore}
        keyboardType="number-pad"
      />

      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    height: 40 // Add this line to give same height to all input fields
  },
});

export default MyForm;
