import { createStackNavigator } from "@react-navigation/stack";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import React, { Component } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";

import FlurryIcon from "../assets/icon.png";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      props,
      username: "",
      password: "",
      isLogin: true, // toggle login/signup
      name: "",
      company: "",
      isManager: false, // toggle driver/manager
    };
  }

  onLogin() {
    const { props, username, password, isLogin, name, company, isManager } =
      this.state;

    let formData;
    let apiCall;
    if (isLogin) {
      apiCall = "login";
      formData = {
        id: username,
        password,
      };
    } else {
      apiCall = "accounts";
      formData = {
        id: username,
        password,
        name,
        company_id: "c_" + company.toLowerCase(),
      };
    }

    const role = isManager ? "manager" : "driver";

    fetch("https://flurry-backend.fly.dev/api/" + apiCall + "?type=" + role, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        const status = res["status"];
        if (status === 400) {
          Alert.alert("Invalid fields");
        } else if (status === 404) {
          Alert.alert("Invalid query param type");
        } else {
          if (isManager) {
            this.props.navigation.navigate("Analytics");
          } else {
            this.props.navigation.navigate("Driver Info");
          }
        }
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
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
        {!this.state.isLogin && (
          <>
            <TextInput
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              placeholder={"Name"}
              style={styles.input}
            />
            <TextInput
              value={this.state.company}
              onChangeText={(company) => this.setState({ company })}
              placeholder={"Company"}
              style={styles.input}
            />
          </>
        )}
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
        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={this.state.isManager}
            onValueChange={() =>
              this.setState({ isManager: !this.state.isManager })
            }
            color={this.state.isManager ? "#007AFF" : undefined}
          />
          <Text style={styles.text}>Manager</Text>
        </View>

        <Button
          title={this.state.isLogin ? "Login" : "Sign up"}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <Button
          title={
            this.state.isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"
          }
          style={styles.alt}
          onPress={() => this.setState({ isLogin: !this.state.isLogin })}
          color="#888888"
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
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    paddingTop: "5%",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  alt: {
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
  checkbox: {
    margin: 8,
  },
  text: {
    lineHeight: 37,
  },
  checkboxWrapper: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    paddingBottom: 5,
  },
});
