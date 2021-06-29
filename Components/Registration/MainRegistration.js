import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Dimensions, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "../Customer/HomePage";
import SnackBar from 'react-native-snackbar-component'
const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

const getData = async () => {
  const value = await AsyncStorage.getItem("storage_Key");
};
// -------- Routing Between Login , Signup Components
// -------- Local Route Handler = switchscreen 
export default class MainRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      isSignup: false,
      ishomepage: false,
      snackbar:false,
      snackbarmsg:"",
      snackbarstatus:"success",
      logindata:""
    };
    this.switchscreen = this.switchscreen.bind(this);
    this.handleSnackBar=this.handleSnackBar.bind(this);
  }
handleSnackBar(msg,status){
this.setState({
  snackbar:true,
  snackbarmsg:msg,
  snackbarstatus:status
})
}
// Handling Screen Switching for Login , Signup
  switchscreen(screen,name,email) {
    if (screen == "login") {
      this.setState({
        islogin: true,
        isSignup: false,
      });
    } else if (screen == "signup") {
      this.setState({
        islogin: false,
        isSignup: true,
      });
    } else if (screen == "homepage") {
      this.setState(
        {
          islogin: false,
          isSignup: false,
          ishomepage: true,
        },
        () => {
          // Parent App.js
          this.props.switchmodule("homepage",name,email);
        }
      );
    } else if (screen=="mechanichomepage"){
      this.props.switchmodule("mechanichomepage",name,email);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.islogin ? (
          <Login switchscreen={this.switchscreen} snackbar={this.handleSnackBar} />
        ) : this.state.isSignup ? (
          <Signup switchscreen={this.switchscreen} snackbar={this.handleSnackBar} />
        ) : (
          <View style={{ padding: 20, marginTop: "20%", width: "100%" }}>
            <TouchableOpacity
              style={styles.Btns}
              onPress={() => {
                this.setState({
                  islogin: true,
                  isSignup: false,
                });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              OR
            </Text>

            <TouchableOpacity
              style={styles.Btns}
              onPress={() => {
                this.setState({
                  isSignup: true,
                  islogin: false,
                });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
              <SnackBar  visible={this.state.snackbar} textMessage={this.state.snackbarmsg} backgroundColor={this.state.snackbarstatus} actionHandler={()=>{this.setState({snackbar:false})}} actionText="Hide"/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1,
  },
  Btns: {
    width: "100%",
    backgroundColor: "#003171",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
