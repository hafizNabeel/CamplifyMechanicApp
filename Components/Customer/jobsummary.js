import React, { useState } from 'react'
import axios from "axios";
import { Icon } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    RefreshControl,
    TouchableHighlight,
    Image
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Dialog from "react-native-dialog";
import { ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SnackBar from 'react-native-snackbar-component'

const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => openDrawer()}>
            <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, color: "#003171" }}>{name}</Text>
        <Text style={{ width: 50 }}></Text>
    </View>
);


export default class JobSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialog: false,
            dialogTitle: "",
            dialogmsg: "",
            customerJobs: [],
            spinner: false,
            checklist: "",
            statustype: "",
            snackbar: false,
            snackbarmsg: "",
            snackbarstatus: "",
            showimage: false,
            showimgdata: "",
            refresh: false
        }
        this.refreshData = this.refreshData.bind(this)
        this.incidentList = this.incidentList.bind(this)
    }


    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem(String(this.props.screenProps.userId) + "/" + "customerJobSummary");
         
            if (value != null) {
                this.setState({
                    customerJobs: JSON.parse(value)
                })
            } else this.incidentList();
        } catch (error) {

        }

    }
    // incidentList();
    async incidentList() {

        console.log("incident list props", this.props.screenProps.userId)
        this.setState({
            refresh: true
        })
        // const value = await AsyncStorage.getItem("storage_Key");
        // console.log("job summary retriving session token", value);
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/incidents_listBy_customer?customerId=" + this.props.screenProps.userId,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
                //   Authorization: `Bearer ${value}`,
            },
            // data: {customerId:props.screenProps.userId},
        }).then(async (response) => {

          
            try {

                await AsyncStorage.setItem(String(this.props.screenProps.userId) + "/" + "customerJobSummary", JSON.stringify(response.data));
            } catch (error) {

            }
            this.setState({
                customerJobs: response.data,
                refresh: false,
            })
        }).catch((e) => {
            this.setState({
                refresh: false,
                snackbar: true,
                snackbarmsg: "Something Went Wrong",
                snackbarstatus: "red"
            })
            console.log("job summary error", e);
        })
    }

    refreshData() {
        this.incidentList();
    }
    assginjob(jobid, decision) {
        this.setState({
            spinner: true
        })

        console.log("assign job params", jobid, decision)
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/job_decision_by_cus?jobId=" + jobid + "&decision=" + decision,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
                //   Authorization: `Bearer ${value}`,
            }
        }).then((response) => {
            console.log("assign job by customer", response)
            this.setState({
                spinner: false, snackbar: true,
                snackbarmsg: "Success !",
                snackbarstatus: 'green'
            })
            this.incidentList();
        }).catch((e) => {
            console.log("assign job by customer error", e)
            this.setState({
                spinner: false,
                snackbar: true,
                snackbarmsg: "Something Went Wrong",
                snackbarstatus: 'red'
            })
        })
    }
    unassginjob(jobid, decision) {
        this.setState({
            spinner: true
        })

        console.log("assign job params", jobid, decision)
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/job_decision_by_cus?jobId=" + jobid + "&decision=" + decision,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
                //   Authorization: `Bearer ${value}`,
            }
        }).then((response) => {
            console.log("assign job by customer", response)
            this.setState({
                spinner: false, snackbar: true,
                snackbarmsg: "Success !",
                snackbarstatus: 'green'
            })
            this.incidentList();
        }).catch((e) => {
            console.log("assign job by customer error", e)
            this.setState({
                spinner: false,
                snackbar: true,
                snackbarmsg: "Something Went Wrong",
                snackbarstatus: 'red'
            })
        })
    }
    // ----------------------------- Input -> List , Output -> UI Components ---------------------------------
    //------------------------------ Currently not Configured for List  
    jobs = (status) => {
        return (

            <View style={{
                shadowOffset: { width: 5, height: 5, },
                shadowColor: 'grey',
                shadowOpacity: 0.4,
            }}>
                {
                    this.state.customerJobs != "" ? this.state.customerJobs.map((element, index) => {
                        if (element.jobs != null) {


                            return (
                                <View key={index}>


                                    <Collapse>
                                        <CollapseHeader>
                                            <View style={{ flexDirection: 'row', height: 40, marginTop: '5%', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 20, color: "#003171" }}>Job {element.jobs.jobId} Status    : </Text>
                                                <Text style={{ fontSize: 20, color: element.jobs.status == "COMPLETE" ? 'green' : element.jobs.status == "ASSIGN" ? 'orange' : '#003171' }}>

                                                    {element.jobs.status == "ASSIGN" ? "Assigned" : element.jobs.status == "COMPLETE" ? "Completed" : "Request"}
                                                </Text>
                                                <Icon
                                                    name='keyboard-arrow-down'
                                                    color='#00aced' />
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <View style={{ }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 17 }}>Created : {new Date(element.jobs.date).toUTCString()} </Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginVertical: 5 }}></View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 17, flexWrap: 'wrap', flex: 1 }}>Message : {element.jobs.message}</Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginTop: 5 }}></View>
                                                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                                    <Text style={{ width: "30%", fontSize: 17 }}>Price</Text>
                                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                                    <Text style={{ width: "70%", fontSize: 17 }}>$ {element.jobs.quotation}</Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                                                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                                    <Text style={{ width: "30%", fontSize: 17 }}>Date</Text>
                                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                                    <Text style={{ width: "70%", fontSize: 17 }}>{new Date(element.jobs.quotation_DATE).toDateString()}</Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                                    <Text style={{ width: "30%", fontSize: 17 }}>Mechanic</Text>
                                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                                    <Text style={{ width: "70%", fontSize: 17 }}>{element.mechanicInfo.fullName}</Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                                    <Text style={{ width: "30%", fontSize: 17 }}>Email</Text>
                                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                                    <Text style={{ width: "70%", fontSize: 17 }}>{element.mechanicInfo.email}</Text>
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                                    <Text style={{ width: "30%", fontSize: 17 }}>Job</Text>
                                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                                    <View style={{ width: "35%", }}>

                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                
                                                                this.setState({
                                                                    dialogTitle: "Checklist " + element.jobs.checklistId,
                                                                    dialog: true,
                                                                    checklist: element.checkLists,
                                                                    statustype: element.jobs.status
                                                                })

                                                            }}
                                                        >
                                                            <Text style={{ fontSize: 17, color: 'blue', fontWeight: 'bold' }}>Checklist</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    {
                                                        element.jobs.status == "ASSIGN" ? <View style={{ width: "35%", }}>

                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    // this.setState({
                                                                    //     dialogTitle: "Contrustion",
                                                                    //     dialogmsg: "Functionailty of this Button is in Development",
                                                                    //     dialog: true
                                                                    // })

                                                                    this.unassginjob(element.jobs.jobId, "REQUEST")
                                                                }}
                                                            >
                                                                <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>UnAssign</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                            : element.jobs.status == "REQUEST" ? <View style={{ width: "35%", }}>

                                                                <TouchableOpacity
                                                                    onPress={() => {

                                                                        this.assginjob(element.jobs.jobId, "ASSIGN")

                                                                    }}
                                                                >
                                                                    <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>Assign</Text>
                                                                </TouchableOpacity>
                                                            </View> : null
                                                    }
                                                </View>
                                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                    <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                </View>
                            )
                        }
                    }) : <Text style={{ color: 'grey', alignSelf: 'center' }}>No Jobs Found</Text>
                }
            </View>
        )
    }
    render() {
        let categoryarr = [];
        this.state.checklist.categories != null ? this.state.checklist.categories.map((element, index) => {
            categoryarr.push(element.categoryName + " ")
        }) : null
        return (
            <View style={{ flex: 1, marginHorizontal: 10, marginTop: '10%' }}>
                <Header name="Jobs Summary" openDrawer={this.props.navigation.openDrawer} />
                <Spinner
                    color="blue"
                    visible={this.state.spinner}
                    textContent={'Updating ..'}
                    textStyle={{ color: "blue", fontWeight: 'normal' }}

                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            color="gold"
                            onRefresh={this.refreshData}
                            refreshing={this.state.refresh}
                        />}
                >
                    {
                        !this.state.refresh ? <Image
                            source={require("../../assets/refresh.png")}
                            style={{ width: "100%", height: 20, marginVertical: 5 }}
                            resizeMode="contain"
                        ></Image> : null
                    }
                    {
                        this.jobs("Completed")
                    }
                    {/* {
                        this.jobs("Assgined")
                    }
                    {
                        this.jobs("Completed")
                    }
                    {
                        this.jobs("Assgined")
                    } */}
                </ScrollView>
                <Dialog.Container  visible={this.state.dialog}> 
                    <Dialog.Title >{this.state.dialogTitle}</Dialog.Title>
                    <Dialog.Description>
                        <View style={{ height: '60%', marginHorizontal: 10, width: "90%", flexDirection: 'column' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                                <Text style={{ fontWeight: '700', fontSize: 13, width: "50%" }}>Description: </Text>
                                <Text style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{this.state.checklist.demageDesc}</Text>
                            </View>
                            <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                            <View style={{ height:45,flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                                <Text style={{ fontWeight: '700', fontSize: 13, width: "50%" }}>Category :</Text>
                                <Text style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{categoryarr}</Text>
                            </View>
                            <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                            <View style={{ height: 280, flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginHorizontal: 5 }}>
                                <Text style={{ fontSize: 13, fontWeight: '500' }}>Photos :</Text>

                                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        {
                                            this.state.checklist.photo != "" && this.state.checklist.photo != null ? this.state.checklist.photo.map((imgdata, index) => {
                                                return <TouchableHighlight key={index} onPress={() => {
                                                    // this.setState({
                                                    //   showimage: true,
                                                    //   showimgdata: imgdata.photos
                                                    // })
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

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 13, width: "30%" }}>Posted by </Text>
                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 25 }}></View>
                                    <Text style={{ fontSize: 13, fontWeight: '700', width: "70%" }}>   {this.state.checklist.email}</Text>


                                </View>
                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 2 }} >

                                    <Text style={{ fontSize: 13, width: "30%" }}>Damage Date : </Text>
                                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 25, marginRight: 20 }}></View>
                                    <Text style={{ fontSize: 13, fontWeight: '700', width: "70%" }}>{new Date(this.state.checklist.demageOccurDate).toDateString()}</Text>
                                </View>
                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                {
                                    this.state.statustype == "Assigned" ?

                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'space-between', height: 40, width: "95%", alignItems: 'center', marginBottom: "3%", shadowOffset: { width: 5, height: 5, },
                                            shadowColor: '#003171',
                                            shadowOpacity: 0.2,
                                        }}>
                                            <Text></Text>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    dialog: false,
                                                    // checklistId:this.state.checklist.checklistId

                                                })
                                              
                                            }}>

                                                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600' }}>Cancel Quote</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : null}
                            </View>
                        </View>

                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            dialog: false
                        })
                    }} label="Cancel" />

                </Dialog.Container>

                <SnackBar visible={this.state.snackbar} textMessage={this.state.snackbarmsg} backgroundColor={this.state.snackbarstatus} actionHandler={() => { this.setState({ snackbar: false }) }} actionText="Hide" />
            </View>
        )
    }
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