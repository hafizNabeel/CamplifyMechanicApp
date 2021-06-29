import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ListItem,
  Body,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import CustomMultiPicker from "react-native-multiple-select-list";

const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

//  -------- Input->Checklist <===========> OutPut->Checklist->StepFour
export default function StepThree({ navigation }) {
  const ScreenOne = navigation.getParam("ScreenOne");
  const ScreenTwo = navigation.getParam("ScreenTwo");

  
  console.log("mystepdata", ScreenOne, ScreenTwo);
  const [checkbox, setCheckbox] = useState("");
  const userList = {
    1: "External Fixture",
    2: "Cleaning",
    3: "Refuelling",
    4: "Tolls",
    5: "Awning",
  };
  return (
    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "5%",shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4,  }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>
          3. Select one or more damage categories
        </Text>
        <Text style={{ color: "#003171", fontSize: 20 }}>
          Choose as many as you like
        </Text>
      </View>

      <CustomMultiPicker
        options={userList}
        multiple={true} //
        placeholder={"Search"}
        placeholderTextColor={"#003171"}
        returnValue={"label"} // label or value
        callback={(checkbox) => setCheckbox(checkbox)}
        rowBackgroundColor={"#eee"}
        rowHeight={45}
        rowRadius={5}
        searchIconName="ios-checkmark"
        searchIconColor="red"
        searchIconSize={30}
        iconColor={"#003171"}
        iconSize={30}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-radio-button-off"}
        selected={[]}
      />

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() =>
            navigation.navigate("StepTwo", {
              ScreenTwo: ScreenTwo,
            })
          }
        >
          <View>
            <Text style={{ marginRight: 15, fontSize: 20, color: "white" }}>
              <Icon name="chevron-left" size={15} color="white" /> Prev
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          disabled={checkbox==""?true:false}
          onPress={() =>
            navigation.navigate(
              "StepFour",
              {
                ScreenOne,
                ScreenTwo,
                ScreenThree: checkbox,
              },
              console.log(JSON.stringify(checkbox))
            )
          }
        >
          <View>
            <Text style={{ marginRight: 15, fontSize: 20, color: checkbox==""?"grey":"white" }}>
              {/* {" "} */}
              Next {""}
              
              <Icon name="chevron-right"  size={15} color={checkbox==""?"grey":"white" } />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    flex: 1,
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#003171",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  inputText: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
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
