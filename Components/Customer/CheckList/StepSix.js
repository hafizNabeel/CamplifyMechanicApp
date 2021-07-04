import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton, Colors } from "react-native-paper";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from 'react-native-snackbar-component'


import Spinner from 'react-native-loading-spinner-overlay';

const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

// ------------ Submit Checklist Data to Server --------------------------
export default function StepSix({ navigation }) {
  const [picture, setImage] = useState([]);
  const ScreenOne = navigation.getParam("ScreenOne");
  const ScreenTwo = navigation.getParam("ScreenTwo");
  const ScreenThree = navigation.getParam("ScreenThree");
  const ScreenFour = navigation.getParam("ScreenFour");
  const ScreenFive = navigation.getParam("ScreenFive");
  const [spinner,setSpinner]=useState(false);
  const [snackbar,setSnackbar]=useState(false);
  const [snackbarMsg,setSnackbarMsg]=useState("");
  const [snackbarStatus,setSnackbarStatus]=useState("");
  console.log(
    "ScreenSix",
    ScreenOne,
    ScreenTwo,
    ScreenThree,
    ScreenFour,
    ScreenFive
  );
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()();

        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // ---------------- Making Server Request and Handling Response ---------------
  const SubmitRequest = async () => {
    setSpinner(true)
    const value = await AsyncStorage.getItem("storage_Key");
    console.log("step six retriving session token", value);
    var category = [];
    if (ScreenThree.length > 0) {
      console.log("cccc", ScreenThree);
      ScreenThree.forEach((element) => {
        console.log("creen three", element);
        if (element != null) {
          category.push({
            CategoryName: element,
          });
        }
      });
    }
let temppic=[];
    if(picture.length>0){
      picture.forEach((element,index) => {
          temppic.push({
            Id:0,
            ChecklistId:0,
            Photos:element.base64
          })
      });
    }

  console.log("my temp images",temppic);
    var params = {
      // UserId:"65d9e78e-e6be-4f4c-b962-03191c53f109",
      Email: ScreenOne,
      IsDemage: ScreenTwo,
      Categories: category,
      DemageDesc: ScreenFour,
      DemageOccurDate: ScreenFive,
      // Photo: [
      //   {
      //     Id: 0,
      //     ChecklistId: 1,
      //     // Photos: picture == "" ? "" : picture[0].uri,
      //     Photos:temppic
      //   },
      // ],
      Photo:temppic
    };
    console.log("image", picture);

    axios({
      method: "post",
      url: "http://adeelahmad01-001-site1.etempurl.com/api/Checklist/Insert",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
      data: params,
    })
      .then(function (res) {
        setSpinner(false)
        navigation.navigate("FinalMessage");
      })
      .catch((err) => {
        console.log("error", err);
        debugger;
        setSpinner(false)
        setSnackbarMsg("Something Went Wrong");
        setSnackbarStatus("red");
        setSnackbar(true);
      });
  };


  //  -------------------- Image Picker ------------------
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      maxHeight: 150,
      maxWidth: 200,
      base64:true,
      includeBase64:true,
      allowsMultipleSelection: 10,
      quality: 1,
    });
    if (result != "" || result != null) {
      console.log("imagess",result)
      setImage(prevArray=>[...prevArray,result])
    }
    mypic = result.uri;
  };
  return (

    <View style={styles.container}>
      <Header name="Post-Hire Checklist" openDrawer={navigation.openDrawer} />
      <View style={{ padding: 20, marginTop: "1%",marginBottom:"30%",alignSelf:'center',shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4, }}>
        <Text style={{ color: "#003171", fontWeight: "bold", fontSize: 30 }}>
          6. Damage photos
        </Text>
        <IconButton
          icon="camera"
          color={Colors.red500}
          size={80}
          onPress={pickImage}
        />
        <View style={{height:100}}>
          <ScrollView horizontal={true}>
      
          <View style={{flexDirection:'row',height:100}}>
            { picture != ""  & picture!= undefined ? picture.map((element, index) => {
              console.log("y pictures", element);
              return (
                <Image
                  key={index}
                  source={{ uri: element.uri }}
                  style={{ width: 100, height: 100 }}
                  resizeMode='stretch'
                />
              );
            }):null}
          </View>
       
        </ScrollView>
        </View>
        {/* <View style={{ marginTop: "10%",justifyContent:'flex-end',alignItems:'flex-end',shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'grey',
            shadowOpacity: 0.3, }}>
          <Button color="#003171" onPress={SubmitRequest} title="Submit" />
        </View> */}
      </View>
      <SnackBar  visible={snackbar} textMessage={snackbarMsg} backgroundColor={snackbarStatus} actionHandler={()=>{setSnackbar(false)}} actionText="Hide"/>
      <View style={styles.bottomView}>
        <TouchableOpacity
        disabled={true}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => navigation.navigate("StepFive")}
        >
          <View>
            <Text style={{ marginRight: 15, fontSize: 20, color: "white",marginTop:5 }}>
              {/* <Icon name="chevron-left" size={15} color="white" /> Prev */}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => SubmitRequest()}
        >
          <Text style={{ marginRight: 15, fontSize: 20, color: "white",marginTop:2 }}>
          Submit  <Icon name="send" marginBottom={3} size={14} color="white" /> 
            </Text>
        </TouchableOpacity>
      </View>
    <Spinner
            visible={spinner}
            textContent={'Please wait ...'}
            color="#003171"
            textStyle={{color:"#003171"}}
          // textStyle={styles.spinnerTextStyle}
          />
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
    marginTop:5
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
