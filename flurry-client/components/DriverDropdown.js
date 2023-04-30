/* eslint-disable no-unused-vars */
import { useState } from "react";
import { StyleSheet } from "react-native";

const dummyDrivers = [
  { id: "1", name: "Max", slipIncidents: 5 },
  { id: "2", name: "Peter", slipIncidents: 2 },
  { id: "3", name: "John", slipIncidents: 10 },
  { id: "4", name: "Jane", slipIncidents: 3 },
];

const DriverDropdown = ({ onSelectDriver }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    setIsExpanded(false);
    onSelectDriver(driver.name);
  };

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity
      style={styles.driverItem}
      //onPress={() => handleDriverSelect(item)
    >
      <Text style={styles.driverName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dropdownTitle}>Pick a driver</Text>
      {selectedDriver ? (
        <Text style={styles.driverText}>
          Number of slip incidents for {selectedDriver}:{" "}
          {
            dummyDrivers.find((driver) => driver.name === selectedDriver)
              .slipIncidents
          }
        </Text>
      ) : (
        <>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.dropdownHeaderText}>Select a driver</Text>
          </TouchableOpacity>
          {isExpanded && (
            <FlatList
              data={dummyDrivers}
              keyExtractor={(item) => item.id}
              renderItem={renderDriverItem}
              style={styles.driverList}
            />
          )}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Analytics Summary</Text>
            <View style={styles.boxContent}>
              <Text style={styles.boxData}>
                Driver with the most number of slip incidents: Max
              </Text>
              <Text style={styles.boxData}>
                Driver with the least number of slip incidents: Smith
              </Text>
              <Text style={styles.boxData}>
                Total number of slips in the given date range: 23
              </Text>
            </View>
          </View>
        </>
      )}
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
