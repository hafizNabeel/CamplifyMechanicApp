import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{ fontSize: 17, color: "#003171" }}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

// -------------- Input -> Email , OutPut -> Email -> Step Two -----------------------------
export default function StepOne({ navigation }, props) {
  console.log("Step One", navigation.getScreenProps().email)
  const [email, setEmail] = useState(navigation.getScreenProps().email);
  return (

    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{
        padding: 20, marginTop: "10%", shadowOffset: { width: 3, height: 3, },
        shadowColor: 'grey',
        shadowOpacity: 0.4,
      }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>
          1. What is your email?
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="JohanDoe@mechanic.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#003171",
            color: "white",
          }}
        >
          <View>
            {/* <Text style={{ color: "#04609F" }}>Prev</Text> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#003171",
          }}
          onPress={() =>
            navigation.navigate(
              "StepTwo",
              {
                ScreenOne: email,
              },
              console.log(JSON.stringify(email))
            )
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
