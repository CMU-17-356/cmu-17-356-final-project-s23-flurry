import * as Location from "expo-location";
import fetch from "node-fetch";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

function MyForm() {
  // Get default values for timestamp and location
  const defaultTimestamp = new Date();
  const [, setLocation] = useState(null);
  const [, setErrorMsg] = useState(null);
  const [driver_id, setDriver_id] = useState("");
  const [slipScore, setSlipScore] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      timestamp: defaultTimestamp.toISOString(),
      latitude,
      longitude,
      driver_id,
      slip_score: parseInt(slipScore, 10),
    };
    fetch("https://flurry-backend.fly.dev/api/slips", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timestamp:</Text>
      <TextInput
        style={styles.input}
        defaultValue={defaultTimestamp.toLocaleString()}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        defaultValue={`${latitude}, ${longitude}`}
      />

      <Text style={styles.label}>Driver ID:</Text>
      <TextInput
        style={styles.input}
        value={driver_id}
        onChangeText={setDriver_id}
      />

      <Text style={styles.label}>Slip Score:</Text>
      <TextInput
        style={styles.input}
        value={slipScore}
        onChangeText={setSlipScore}
      />

      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    width: "100%",
    fontSize: 16,
    height: 40, // Add this line to give same height to all input fields
  },
});

export default MyForm;
