

import React , { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import Dialog from "react-native-dialog";

const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => openDrawer()}>
            <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
        <Text style={{ width: 50 }}></Text>
    </View>
);
export default function Notifications({ navigation }) {
    const [dialog, setDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogmsg, setDialogMsg] = useState("");
    const notifications = () => {
        return (
            <View style={{shadowOffset:{  width: 4,  height: 4,  },
            shadowColor: 'grey',
            shadowOpacity: 0.4,}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50 }}>
                    <Image
                        source={require("../../assets/job.png")}
                        style={{ width: "30%", height: "50%" }}
                        resizeMode="contain"
                    >
                    </Image>
                    <Text style={{ fontSize: 18 }}>New Request from Walter </Text>
                    <Image
                        source={require("../../assets/bell.png")}
                        style={{ width: "30%", height: "50%" }}
                        resizeMode="contain"
                    ></Image>
                </View>
                <View style={{ height: 0.5, flexDirection: 'row', backgroundColor: 'grey' }}></View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: '10%' }}>
            <Header name="Notifications" openDrawer={navigation.openDrawer} />
            <ScrollView>
                {
                    notifications()
                }
                {
                    notifications()
                }
                {
                    notifications()
                }
                {
                    notifications()
                }
                {
                    notifications()
                }
                {
                    notifications()
                }
            </ScrollView>
            <Dialog.Container visible={dialog}>
                <Dialog.Title style={{color:'gold'}}>{dialogTitle}</Dialog.Title>
                <Dialog.Description>{dialogmsg}</Dialog.Description>
                <Dialog.Button onPress={() => {
                    setDialog(false)
                }} label="Cancel" />

            </Dialog.Container>
            <FloatingAction
            floatingIcon={require("../../assets/question.png")}
            iconWidth={30}
            iconHeight={50}
            buttonSize={60}
            showBackground={false}
            onPressMain={()=>{
                setDialogTitle("In Construction ")
                setDialogMsg("This screen is showing Dummy Data")
                setDialog(true);
            }}
  />
        </View>
    )
}
const styles = StyleSheet.create({

    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
});