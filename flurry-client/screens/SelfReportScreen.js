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
  const defaultTimestamp = new Date();

  // Use geolocation-utils to get user's location
  // const { latitude, longitude } = usePosition();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // console.log(location);
  // Set up state for form inputs
  const [driver_id, setDriver_id] = useState('');
  const [slipScore, setSlipScore] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // console.log(latitude, longitude);
  const toTimestamp = (strDate) => {
    const dt = new Date(strDate).getTime();
    console.log(dt)
    return dt / 1000;
  };
  // Handle form submission
  const handleSubmit =  (e) => {
    e.preventDefault();

    // Create object with form data
    const formData = {
      timestamp: (defaultTimestamp),
      latitude: latitude,
      longitude: longitude,
      // location: `${latitude}, ${longitude}`,
      driver_id: driver_id,
      slip_score: slipScore,
    };

    // Do something with form data here (e.g. send to server)
    console.log(formData);

    // eslint-disable-next-line no-undef
    fetch('https://flurry-backend.fly.dev/api/slips', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
      body: JSON.stringify(formData)
    })
    // .then(response => response.json())
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error);
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
      <TextInput style={styles.input} defaultValue={defaultTimestamp.toLocaleString()}  />

      <Text style={styles.label}>Location:</Text>
      <TextInput style={styles.input} defaultValue={`${latitude}, ${longitude}`}  />

      <Text style={styles.label}>Driver ID:</Text>
      <TextInput
        style={styles.input}
        value={driver_id}
        onChangeText={setDriver_id}
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
