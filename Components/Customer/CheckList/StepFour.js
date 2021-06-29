import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
// -------- Input(Description) <============> Output(Description)->Step Five ---------------------
export default function StepFour({ navigation }) {
  const ScreenOne = navigation.getParam("ScreenOne");
  const ScreenTwo = navigation.getParam("ScreenTwo");
  const ScreenThree = navigation.getParam("ScreenThree");
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "5%",shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4,  }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>
          4. Describe the demage
        </Text>
        <TextInput
          style={styles.inputText}
          multiline={true}
          placeholder="For example there is a tear on the drivers side seat near head rest. "
          value={text}
          onChangeText={(prev) => setText(prev)}
        />
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => navigation.navigate("StepThree")}
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
            navigation.navigate("StepFive", {
              ScreenOne,
              ScreenTwo,
              ScreenThree,
              ScreenFour: text,
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
    width: 300,
    height: 40,
    borderColor: "#003171",
    borderWidth: 1.5,
    marginTop: 20,
    marginBottom: 10,
    // paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 15,
    minHeight: 150,
    height: "auto",
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
