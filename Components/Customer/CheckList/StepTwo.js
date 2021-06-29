import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

// ------------ Input-->  Damage (yes , no ) <===============>  Output ------> Damage (yes,no) -------> Step Three

export default function StepTwo({ navigation }) {
  const ScreenOne = navigation.getParam("ScreenOne");
  const [radio, setRadio] = React.useState(true);
  var radio_props = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  return (
    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "5%" ,shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4, }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>2. Did any damage occur?
        </Text>

        <View style={{ marginTop: "10%", flexDirection: "row" }}>
          <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            radio_props={radio_props}
            initial={0}
            value={radio}
            
            onPress={(value) => {
              setRadio(value);
            }}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => navigation.navigate("Checklist")}
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
            navigation.navigate(
              "StepThree",
              {
                ScreenOne: ScreenOne,
                ScreenTwo: radio,
              },
              console.log(JSON.stringify(ScreenOne), JSON.stringify(radio))
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
