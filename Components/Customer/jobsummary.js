import React, { useState } from 'react'

import { Icon } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Dialog from "react-native-dialog";
import { ScrollView } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => openDrawer()}>
            <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text style={{fontSize:17,color:"#003171"}}>{name}</Text>
        <Text style={{ width: 50 }}></Text>
    </View>
);
export default function JobSummary({ navigation }) {
    const [dialog, setDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogmsg, setDialogMsg] = useState("");

// ----------------------------- Input -> List , Output -> UI Components ---------------------------------
//------------------------------ Currently not Configured for List  
    const jobs = (status) => {
        return (

            <View style={{
                shadowOffset: { width: 5, height: 5, },
                shadowColor: 'grey',
                shadowOpacity: 0.4,
            }}>
                <Collapse>
                    <CollapseHeader>
                        <View style={{ flexDirection: 'row', height: 40, marginTop: '5%', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20 }}>Status : </Text>
                            <Text style={{ fontSize: 20, color: status == "Completed" ? 'green' : 'blue' }}>{status}</Text>
                            <Icon
                                name='keyboard-arrow-down'
                                color='#00aced' />
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17 }}>Date : 20 Sep 2021 </Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginVertical: 5 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, flexWrap: 'wrap', flex: 1 }}>Message : I'v 5 years of experiance replacing car doors . I'm the best fit for this job I would like to do this Job</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginTop: 5 }}></View>
                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                            <Text style={{ width: "30%", fontSize: 17 }}>Name</Text>
                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                            <Text style={{ width: "70%", fontSize: 17 }}>Walter White</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                            <Text style={{ width: "30%", fontSize: 17 }}>Email</Text>
                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                            <Text style={{ width: "70%", fontSize: 17 }}>walterwhite@camplify.com</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                            <Text style={{ width: "30%", fontSize: 17 }}>Job</Text>
                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                            <View style={{ width:status!="Completed"? "35%":"70%", }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setDialogTitle(" Contrustion ")
                                        setDialogMsg("Functionailty of this Button is in Development");
                                        setDialog(true);

                                    }}
                                >
                                    <Text style={{ fontSize: 17, color: 'blue', fontWeight: 'bold' }}>Checklist</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                status!="Completed"? <View style={{ width: "35%", }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setDialogTitle(" Contrustion ")
                                        setDialogMsg("Functionailty of this Button is in Development");
                                        setDialog(true);

                                    }}
                                >
                                    <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>Mark Complete</Text>
                                </TouchableOpacity>
                            </View>:null
                            }
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>


                    </CollapseBody>
                </Collapse>
                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: '10%' }}>
            <Header name="Jobs Summary" openDrawer={navigation.openDrawer} />
            <ScrollView>
                {
                    jobs("Completed")
                }
                {
                    jobs("Assgined")
                }
                {
                    jobs("Completed")
                }
                {
                    jobs("Assgined")
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
                onPressMain={() => {
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