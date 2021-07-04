import React from "react";
import HomePage from "./Components/Customer/HomePage";
import MainRegistration from "./Components/Registration/MainRegistration";
import MechanicHomePage from "./Components/Mechanic/MechanicHomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isregistration: true,
      userType: "Customer",
      userId: "",
      name: "",
      email: ""
    };
    this.switchmodule = this.switchmodule.bind(this);
  }


  async componentDidMount() {

    // --------- Checking if the user already Logged in --------------
    const value = await AsyncStorage.getItem("storage_Key");
    console.log("retrieving token in app ", value);
    var decoded = jwt_decode(value);
    var userTypedecoded = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    var name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    var email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    var userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log("decoded token", decoded);

    if (value != null & userTypedecoded != null) {
      this.setState({
        isregistration: false,
        userType: userTypedecoded,
        userId,
        name,
        email
      });
    } else {
      console.log("my thoken is ", value);
      this.setState({
        isregistration: true,
      });
    }
  }

  // ----------------- SwitchModule Function Provides Data Linking and Navigation between Parent - Child and Sub Childs ---------
  switchmodule(module,name,email,userId) {
    console.log("switcher", module);
    if (module == "homepage") {
      this.setState({
        isregistration: false,
        userType: "Customer",
        name:name,
        email:email,
        userId:userId
      });
    } else if (module == "mechanichomepage") {
      this.setState({
        isregistration: false,
        userType: "Mechanic",
        name:name,
        email:email,
        userId:userId
      })
    } else {
      this.setState({
        isregistration: true,
      });
    }
  }

  // --------------- Redirecting User from Registration to its respective Dashboard --------------
  render() {
    return this.state.isregistration ? (
      <MainRegistration switchmodule={this.switchmodule} />
    ) : this.state.userType == "Customer" ? (
      <HomePage userId={this.state.userId} name={this.state.name} email={this.state.email} switchmodule={this.switchmodule} />
    ) : <MechanicHomePage userId={this.state.userId} name={this.state.name} email={this.state.email} switchmodule={this.switchmodule}></MechanicHomePage>
  }
}
