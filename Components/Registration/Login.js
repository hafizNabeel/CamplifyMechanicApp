import axios from "axios";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import jwt_decode from "jwt-decode";
import SnackBar from 'react-native-snackbar-component'


// Takes User Credentials and Authenticate to Server , Cahce in case of Success -------
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visible: false,
      snackbarmsg: "",
      spinner:false,
    };
  }

  //  Sending Login Request to Server and handling response -- Storing Cache --
  login = async (email, pass) => {
    this.setState({
      spinner:true
    })
    var ref=this;
    var parentprops=this.props;
    axios({
      method: "post",
      url: "http://13.236.175.70:443/api/Authenticate/Login",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { Email: email, Password: pass },
    }).then(async (response) => {
      console.log(response)
      this.setState({
        spinner:false
      })
      await AsyncStorage.setItem("storage_Key", response.data.token);
      var decoded = jwt_decode(response.data.token);
      var userTypedecoded=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      var name=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      var email=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      console.log("decoded token",decoded);
      if (response.status == 200) {
        console.log("Login success");
        this.props.snackbar("Login Success","green")
        userTypedecoded=="Customer"?
        this.props.switchscreen("homepage",name,email):this.props.switchscreen("mechanichomepage",name,email);
      }else this.props.snackbar("Email or Password not correct","red");
      try {
        await AsyncStorage.setItem("storage_Key", response.data.token);
      } catch (e) {
      
      }
    }).catch((e)=>{
      console.log("login error")
      this.setState({
        spinner:false
      })
      this.props.snackbar("Something Went Wrong","red")
      
    });
    // .catch((err) => {
    //   console.log("im hereeeee", err);
    //   this.setState({
    //     visible: true,
    //     snackbarmsg: "Login Failed",
    //   });
    // });
  };

  render() {
    const { navigation } = this.props;
    const { visible } = this.state;
    return (
      <View style={styles.container}>
            <Spinner
          visible={this.state.spinner}
          color="#003171"
          textContent={'Loading...'}
          textStyle={{color:"#003171"}}
        />


        <View style={styles.childContainer}>
          <Text style={{ fontSize: 20, color: "#003171" }}>
            Log in to your account
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Email"
            keyboardType="username"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.inputTextPass}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.Btns}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "bold",
              }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.switchscreen("signup");
            }}
          >
            <Text style={styles.forgot}>Signup</Text>
          </TouchableOpacity>
          
        </View>
  
      </View>
    );
  }
}
export default Login;
const styles = StyleSheet.create({
  container: {
    width: "85%",
  },
  childContainer: {
    padding: 20,
    marginTop: "20%",
    width: "100%",
  },
  inputText: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    marginTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  inputTextPass: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  forgot: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "#84bde3",
    fontSize: 17,
  },
  loginBtn: {
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
  loginText: {
    color: "white",
    fontWeight: "bold",
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
