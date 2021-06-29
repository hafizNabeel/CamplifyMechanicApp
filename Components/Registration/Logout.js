import React from "react";
import { Text ,View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";


// ------------ Deletes User  Session and Redirects to Registration Screen ---------
export default class  Logout extends React.Component{
  constructor(props){
    super(props)
  }
 async componentDidMount(){
console.log("logout",this.props.screenProps)
    try {
    await AsyncStorage.removeItem("storage_Key", (err) => {
      console.log("logout status", err);
      this.props.screenProps.switchmodule("login");
    });
  } catch (e) {}
  }

render(){

  return (
    <View>
    
      <Text>Log out</Text>
    </View>
      );
}
}

