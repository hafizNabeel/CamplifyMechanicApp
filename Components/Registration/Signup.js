import React, { Component } from "react";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

var radio_props = [
  { label: 'Customer', value: 0 },
  { label: 'Mechanic', value: 1 }
];
class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      password: "",
      spinner: false,
      userType: "Customer"
    };
  }

  Signuphandler = () => {
    this.setState({
      spinner: true
    })
    var mypros = this.props;
    var ref = this;
    try {
      var params = {
        Username: this.state.fullname,
        FullName: this.state.fullname,
        Email: this.state.email,
        Phone: this.state.phone,
        Address: this.state.address,
        ServiceType: this.state.serviceType,
        Password: this.state.password,
        userType: this.state.userType
      };
      axios({
        method: "post",
        url: "http://13.236.175.70:443/api/Authenticate/register",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      }).then(function (response) {
        console.log("123", response.data);
        console.log("321", response.status);
        ref.setState({
          spinner: false
        }, () => {
          if (response.status == 200 || response.data.status == "Success") {
            mypros.snackbar(response.data.message, "green");
            mypros.switchscreen("login");
          } else mypros.snackbar(response.data.message, "red");


        })


      }).catch((e) => {
        console.log(e)
        this.setState({
          spinner: false
        })
        this.props.snackbar("Something Went Wrong", "red")
      });
    } catch (e) {
      console.log(e)


    }
  };


  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
      <View >
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{ padding: 20, marginTop: "5%", width: "100%" }}>
          <Text style={{ fontSize: 20, color: "#003171", marginBottom: 20 }}>
            Sign up now
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Full Name"
            onChangeText={(text) => this.setState({ fullname: text })}
            value={this.state.fullname}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            onChangeText={(text) => this.setState({ phone: text })}
            value={this.state.phone}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Address"
            onChangeText={(text) => this.setState({ address: text })}
            value={this.state.address}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Service type"
            onChangeText={(text) => this.setState({ serviceType: text })}
            value={this.state.serviceType}
          />
          <TextInput
            style={styles.inputTextPass}
            secureTextEntry={true}
            placeholder="Chose Password"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          <View style={{ marginTop: 20 }}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              animation={true}
              onPress={(value) => {
                value == 0 ? this.setState({ userType: "Customer" }) : this.setState({ userType: "Mechanic" })
              }}
            />
          </View>
          <TouchableOpacity style={styles.Btns} onPress={this.Signuphandler}>
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
          <TouchableOpacity
            onPress={() => {
              this.props.switchscreen("login");
            }}
          >
            <Text style={styles.forgot}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  }
}
export default Signup;
const styles = StyleSheet.create({
  container: {
    width: "85%",
    // flex: 1,
    // padding: 20,
    // backgroundColor: "#fff",
    // paddingTop: 40,
    // alignItems: "center",
    // flex: 1,
  },
  forgot: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "#84bde3",
    fontSize: 17,
  },
  inputText: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  inputTextPass: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  signinBtn: {
    color: "white",
    backgroundColor: "#003171",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  Btns: {
    // width: 200,
    backgroundColor: "#003171",
    borderRadius: 5,
    height: 50,
    marginTop: 30,
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
