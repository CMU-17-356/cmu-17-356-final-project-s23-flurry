import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const DriverDropdown = ({ onSelectDriver, drivers, slips }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverSlips, setDriverSlips] = useState(0);

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity
      style={styles.driverItem}
      onPress={() => {
        if (selectedDriver && selectedDriver.id === item.id) {
          setSelectedDriver(null);
          setIsExpanded(true);
        } else {
          const slipsForDriver = slips.filter(
            (slip) => slip.driver_id === item.id
          );
          setDriverSlips(slipsForDriver.length);
          setSelectedDriver(item);
          setIsExpanded(false);
          onSelectDriver(item.id);
        }
      }}
    >
      <Text style={styles.driverName}>{item.name}</Text>
      {selectedDriver && selectedDriver.id === item.id && (
        <Text style={styles.driverSlipIncidents}>Pick a different driver</Text>
      )}
      {!selectedDriver && (
        <Text style={styles.driverSlipIncidents}>Driver ID: {item.id}</Text>
      )}
    </TouchableOpacity>
  );

  if (!drivers || !drivers.length) {
    return null;
  }

  const slipsByDriver = slips.reduce((acc, slip) => {
    acc[slip.driver_id] = (acc[slip.driver_id] || 0) + 1;
    return acc;
  }, {});

  const maxSlipsDriverId = Object.keys(slipsByDriver).reduce((a, b) => {
    return slipsByDriver[a] > slipsByDriver[b] ? a : b;
  }, "N/A");

  const minSlipsDriverId = Object.keys(slipsByDriver).reduce((a, b) => {
    return slipsByDriver[a] < slipsByDriver[b] ? a : b;
  }, "N/A");

  const maxSlipsDriver = drivers.find(
    (driver) => driver.id === maxSlipsDriverId
  );

  const minSlipsDriver = drivers.find(
    (driver) => driver.id === minSlipsDriverId
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dropdownTitle}>Pick a driver</Text>
      {selectedDriver && (
        <Text style={styles.driverText}>
          # slip incidents for {selectedDriver.name}:{" "}
          {slips.filter((slip) => slip.driver_id === selectedDriver.id).length}
        </Text>
      )}
      {<>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.dropdownHeaderText}>Select a driver</Text>
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={drivers}
            keyExtractor={(item) => item.id}
            renderItem={renderDriverItem}
            style={styles.driverList}
          />
        )}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Analytics Summary</Text>
          <View style={styles.boxContent}>
            <Text style={styles.boxData}>
              Driver with the most number of slip incidents:{" "}
              {maxSlipsDriver ? maxSlipsDriver.name : "N/A"}
            </Text>
            <Text style={styles.boxData}>
              Driver with the least number of slip incidents:{" "}
              {maxSlipsDriver ? minSlipsDriver.name : "N/A"}
            </Text>
            <Text style={styles.boxData}>
              Total number of slips in the given date range: {slips.length}
            </Text>
          </View>
        </View>
      </>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownHeader: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownHeaderText: {
    fontSize: 16,
  },
  driverList: {
    maxHeight: 150,
  },
  driverItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  driverName: {
    flex: 1,
    fontSize: 16,
  },
  driverSlipIncidents: {
    fontSize: 14,
    color: "gray",
  },
  genericDataContainer: {
    marginTop: 10,
  },
  genericDataText: {
    fontSize: 14,
  },
  driverText: {
    fontSize: 16,
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 16,
    padding: 16,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  boxContent: {
    flexDirection: "column",
  },
  boxData: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DriverDropdown;
