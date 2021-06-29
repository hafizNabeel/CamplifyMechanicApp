import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
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

export default function FinalMessage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "20%" }}>
        <Text>
          To the best of your knowledge, what date did the damage occur? If
          there are multiple incidents of damage. Please specify each date below
          and the damage caused.
        </Text>
      </View> */}
        <Header name="Checklist Submitted Successfully"  openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "20%" ,shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4,}}>
        <Text>
         You Checklist is Submitted . Recieving Requests from Mechanics . Please Wait ..
        </Text>
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
    backgroundColor: "#04609F",
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
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
