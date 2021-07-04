import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Button, StyleSheet, RefreshControl, TouchableOpacity, TextInput, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import { ExpandableListView } from 'react-native-expandable-listview';
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import { render } from 'react-dom';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from 'react-native-elements'
import { Dimensions } from 'react-native';
import Dialog from "react-native-dialog";
import DateTimePicker from '@react-native-community/datetimepicker';
import jwt_decode from "jwt-decode";
import { Ionicons } from "@expo/vector-icons";
const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => openDrawer()}>
            <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, color: "#003171" }}>{name}</Text>
        <Text style={{ width: 50 }}></Text>
    </View>
);
export default class Incident extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            checklist: [], // ---------- Contains Data from Server ----------------------
            dialog: false,
            quotemsg: "",
            quote: 0,
            quotedate: new Date(),
            submitdisable: true,
            showimage: false,
            showimgdata: "",
            checklistId: "",
            refresh: false
        }
        this.getChecklist = this.getChecklist.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    async componentDidMount() {
        //-------------  Cahced Jobs ------------------
        try {
            const value = await AsyncStorage.getItem(String(this.props.userId) + "/" + "Checklist");
            // console.log("chached checklist", JSON.parse(value));
            if (value != null) {
                this.setState({
                    checklist: JSON.parse(value)
                })
            } else this.getChecklist(this.props.screenProps.userId);
        } catch (error) {

        }

    }


    // ------ This Method Gets Checklist of all customers from Server and Store it in the Cache --------------
    getChecklist(customerId) {
        this.setState({
            refresh: true
        })
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/AllChecklist_by_cus?customerId=" + customerId,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then(async (response) => {
            // console.log("response checklist", response);
            // Store jobs in chache
            try {

                await AsyncStorage.setItem(String(this.props.userId) + "/" + "Checklist", JSON.stringify(response.data));
            } catch (error) {

            }
            this.setState({
                refresh: false,
                checklist: response.data
            })
        }).catch((e) => {
            console.log("error", e)
            this.setState({
                refresh: false
            })
        })
    }

    // ---------- Force bring new Data from the Server and Update the Jobs Cache --------------------
    async refreshData() {
        this.getChecklist(this.props.screenProps.userId);
        try {
            const value = await AsyncStorage.getItem(String(this.props.userId) + "/" + "Checklist");
            // console.log("chached available jobs", JSON.parse(value));
            if (value != null) {
                this.setState({
                    checklist: JSON.parse(value)
                })
            } else this.getChecklist(this.props.screenProps.userId);
        } catch (error) {

        }
    }

    render() {
        let categoryarr=[];
        // console.log("incidents ",this.state.checklist.email)
        // this.state.checklist!=""?console.log(this.state.checklist.email):null
        // // this.state.checklist.categories!=null?this.state.checklist.categories.map((element,index)=>{
        // //     console.log("incidents ",element.categoryName)
        // // categoryarr.push(element.categoryName)
        // // }):null

        return (
            <View style={{ flex: 1, marginHorizontal: 10, marginTop: '10%' }}>
                <Header name="Incidents" openDrawer={this.props.navigation.openDrawer} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            color="gold"
                            onRefresh={this.refreshData}
                            refreshing={this.state.refresh}
                        />
                    }
                >
                    <View style={{ flex: 1 }}>
                        {/* <Text>Available Jobs</Text> */}
                        <Spinner
                            color="#003171"
                            visible={this.state.spinner}
                            textContent={'Loading Jobs . .'}
                            textStyle={{ color: "#003171" }}

                        />


                        {
                            !this.state.refresh ? <Image
                                source={require("../../assets/refresh.png")}
                                style={{ width: "100%", height: 20, marginVertical: 5 }}
                                resizeMode="contain"
                            ></Image> : null
                        }

                        {/* ----------------- Render Data from Checklist Array ----------------- */}
                        {
                            this.state.checklist != "" ? this.state.checklist.map((element, index) => {
                            //    console.log("incidenets",element.categories)
                            element.categories!=""?element.categories.map((category)=>{
                                categoryarr.push(category.categoryName+" ")
                            }):null
                                return (
                                    <View key={index}>
                                        <View style={{
                                            backgroundColor: '#f2ebeb', height: 1, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 5, height: 5, },
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.5,
                                        }} />
                                        <Collapse>
                                            <CollapseHeader>
                                                <View style={{
                                                    flexDirection: 'row', height: 55, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginHorizontal: 10, shadowOffset: { width: 5, height: 5, },
                                                    shadowColor: 'grey',
                                                    shadowOpacity: 0.5,
                                                }}>

                                                    <Text style={{ fontSize: 20, alignItems: 'center', color: "#003171" }}>Incident {element.checklistId}</Text>
                                                    <Icon
                                                        name='keyboard-arrow-down'
                                                        color='#00aced' />

                                                </View>

                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View style={{ height: "70%", flexDirection: 'column', }}>
                                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>Damage Description: </Text>
                                                        <Text style={{ fontSize: 15, flexWrap: 'wrap', flex: 1 }}>{element.demageDesc}</Text>
                                                    </View>
                                                    <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                                                        <Text style={{ fontWeight: '700', fontSize: 16, width: "50%" }}>Category :</Text>
                                                        <Text style={{ fontSize: 15, flexWrap: 'wrap', flex: 1 }}>{categoryarr}</Text>
                                                    </View>
                                                    <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                    <View style={{ height: 280, flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginHorizontal: 5 }}>
                                                        <Text style={{ fontSize: 15, fontWeight: '500' }}>Photos :</Text>

                                                        <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                                {
                                                                    element.photo != "" ? element.photo.map((imgdata, index) => {
                                                                        return <TouchableHighlight key={index} onPress={() => {
                                                                            this.setState({
                                                                                showimage: true,
                                                                                showimgdata: imgdata.photos
                                                                            })
                                                                        }}>
                                                                            <View >

                                                                                <Image key={index} source={{ uri: String(imgdata.photos).includes("data:image/jpeg;base64,") ? imgdata.photos : "data:image/jpeg;base64," + imgdata.photos }}
                                                                                    style={{ width: 150, height: 130, resizeMode: 'cover', borderWidth: 1, borderColor: 'red' }}
                                                                                /></View>
                                                                        </TouchableHighlight>

                                                                    }) : <Text>No Image Found</Text>
                                                                }

                                                            </View>
                                                        </ScrollView>
                                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: "1%" }}>
                                                            <Text style={{ fontSize: 15, width: "30%" }}>Posted by </Text>
                                                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 25 }}></View>
                                                            <Text style={{ fontSize: 15, fontWeight: '700', width: "70%" }}>   {element.email}</Text>


                                                        </View>
                                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: "1%" }} >

                                                            <Text style={{ fontSize: 15, width: "30%" }}>Damage Date : </Text>
                                                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 25, marginRight: 20 }}></View>
                                                            <Text style={{ fontSize: 15, fontWeight: '700', width: "70%" }}>{new Date(element.demageOccurDate).toDateString()}</Text>
                                                        </View>
                                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                                                    </View>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>

                                    </View>
                                )
                            }) : <Text style={{ color: 'grey', alignSelf: 'center' }}>No Incidents Found</Text>
                        }

                    </View>


                    <Dialog.Container visible={this.state.showimage}>
                        <Dialog.Title>Image</Dialog.Title>
                        <Image
                            source={{ uri: this.state.showimgdata }}
                            source={{ uri: String(this.state.showimgdata).includes("data:image/jpeg;base64,") ? this.state.showimgdata : "data:image/jpeg;base64," + this.state.showimgdata }}
                            style={{ width: 250, height: 400, alignSelf: 'center', resizeMode: 'contain', borderWidth: 1, backgroundColor:'white'}}
                        >

                        </Image>

                        <Dialog.Button onPress={() => {
                            this.setState({
                                showimage: false
                            })
                        }} label="Hide" />

                    </Dialog.Container>
                </ScrollView>
            </View>
        )
    };
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