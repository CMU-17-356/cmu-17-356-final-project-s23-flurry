import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import React, { Component } from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";

import FlurryIcon from "../assets/icon.png";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  onLogin() {
    const { username, password } = this.state;

    Alert.alert("Credentials", `${username} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={FlurryIcon}
          contentFit="cover"
		transition={1000}
		style={styles.image}
        />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={"Username"}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={"Login"}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  image: {
	  width: 100,
	  height: 100,
	  margin: 10,
  },
});
