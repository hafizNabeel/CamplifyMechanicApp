import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);
// ----------------------- Input(Date) <=============> Output(Date)->Step Six
export default function StepFive({ navigation }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const ScreenOne = navigation.getParam("ScreenOne");
  const ScreenTwo = navigation.getParam("ScreenTwo");
  const ScreenThree = navigation.getParam("ScreenThree");
  const ScreenFour = navigation.getParam("ScreenFour");
  console.log("ScreenFive", ScreenOne, ScreenTwo, ScreenThree, ScreenFour);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "5%" ,shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4, }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>
          5. What date(s) did the demage occur?
        </Text>
        <View style={{ marginTop: "15%" ,justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Button color="#003171" onPress={showDatepicker} title="Enter Date" />
       
        </View>
        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Add another</Text>
        </TouchableOpacity> */}
        <View style={{justifyContent:'center',alignContent:'center'}}>
        {show && (
        
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{marginTop:'5%',color:"#003171"}}
        />
      )}
        </View>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => navigation.navigate("StepFour")}
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
          onPress={() =>
            navigation.navigate("StepSix", {
              ScreenOne,
              ScreenTwo,
              ScreenThree,
              ScreenFour,
              ScreenFive: date,
            })
          }
        >
          <View>
            <Text style={{ marginRight: 15, fontSize: 20, color: "white" }}>
              {" "}
              Next <Icon name="chevron-right" size={15} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    marginTop: "10%",
  },
  forgot: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "gray",
    fontSize: 14,
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
