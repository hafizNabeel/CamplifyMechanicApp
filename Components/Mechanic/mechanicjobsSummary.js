import React, { useState } from 'react'

import { Icon } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    RefreshControl, ScrollView,
    TouchableHighlight,
    Image
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Dialog from "react-native-dialog";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import SnackBar from 'react-native-snackbar-component'



export default class MechanicJobsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            dialogTitle: "",
            dialogmsg: "",
            mechanicjobs: [],
            spinner: false,
            checklist:"",
            snackbar:false,
            snackbarmsg:"",
            snackbarstatus:"",
            refresh:false
        }
        this.refreshData = this.refreshData.bind(this)
        this.listmechnaicjobsummary = this.listmechnaicjobsummary.bind(this);
    }
    // const [dialog, setDialog] = useState(false);
    // const [dialogTitle, setDialogTitle] = useState("");
    // const [dialogmsg, setDialogMsg] = useState("");
    // console.log("mechanic summary props",props)

    async listmechnaicjobsummary() {
        this.setState({
            refresh: true
        })

        // const value = await AsyncStorage.getItem("storage_Key");
        // console.log("job summary retriving session token", value);
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/job_summary?mechanicId=" + this.props.userId,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8"
            },
        }).then(async (response) => {
            console.log(response.data);
            try {

                await AsyncStorage.setItem(String(this.props.userId) + "/" + "mechanicJobsSummary", JSON.stringify(response.data));
            } catch (error) {

            }
            this.setState({
                mechanicjobs: response.data,
                refresh: false
            })
            console.log(response)

        }).catch((e) => {
            console.log("job summary error", e);
            this.setState({
                refresh:false,
                snackbar:true,
                snackbarmsg:"Something Went Wrong",
                snackbarstatus:"red"
            })
        })


    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem(String(this.props.userId) + "/" + "mechanicJobsSummary");
            console.log("chached checklist", JSON.parse(value));
            if (value != null) {
                this.setState({
                    mechanicjobs: JSON.parse(value)
                })
            } else this.listmechnaicjobsummary();
        } catch (error) {

        }


    }

    refreshData() {
        console.log("in referesh data")
        this.listmechnaicjobsummary();
    }

    completeJob(jobid,iscomplete){
        this.setState({
            spinner:true
        })

        console.log("assign job params",jobid,iscomplete)
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/job_completion?jobId="+jobid+"&isComplete="+iscomplete,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
                //   Authorization: `Bearer ${value}`,
            }
        }).then((response)=>{
            console.log("complete job by customer",response)
            this.setState({
                spinner:false,snackbar:true,
                snackbarmsg:"Success !",
                snackbarstatus:'green'
            })
            this.listmechnaicjobsummary();
        }).catch((e)=>{
            console.log("complete job by customer error",e)
            this.setState({
                spinner:false,
                snackbar:true,
                snackbarmsg:"Something Went Wrong",
                snackbarstatus:'red'
            })
        })
    }

    cancelRequest(jobId,isCancled){
        this.setState({
            spinner:true
        })

        console.log("assign job params",jobId,isCancled)
        axios({
            method: "post",
            url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/job_cancel_mec?jobId="+jobId+"&isCancled="+isCancled,
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
                //   Authorization: `Bearer ${value}`,
            }
        }).then((response)=>{
            console.log("cancel job by customer",response)
            this.setState({
                spinner:false,snackbar:true,
                snackbarmsg:"Success !",
                snackbarstatus:'green'
            })
            this.listmechnaicjobsummary();
        }).catch((e)=>{
            console.log("cancel job by customer error",e)
            this.setState({
                spinner:false,
                snackbar:true,
                snackbarmsg:"Something Went Wrong",
                snackbarstatus:'red'
            })
        })
    }
    // -----------------------------------      Input -> List , Output -> UI Components --------------------------
    //------------------------------------ Currently not Configured for List ( Backend in Construction ) -------------------------
    jobs = () => {
        return (

            <View>
                {
                    this.state.mechanicjobs != "" ? this.state.mechanicjobs.map((element, index) => {
                        return (
                            <View key={index}>


                                <Collapse>
                                    <CollapseHeader>
                                        <View style={{
                                            flexDirection: 'row', height: 40, marginTop: '5%', justifyContent: 'space-between', shadowOffset: { width: 5, height: 5, },
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.5,
                                        }}>
                                            <Text style={{ fontSize: 20 }}>Status Job {element.jobs.jobId} : </Text>
                                            <Text style={{ fontSize: 20, color: element.jobs.status == "COMPLETE" ? 'green' : element.jobs.status == "ASSIGN"?'orange':'#003171' }}>
                                            {element.jobs.status=="ASSIGN"?"Assigned":element.jobs.status=="COMPLETE"?"Completed":"Applied"}
                                            </Text>
                                                {/* {element.jobs.status=="REQUEST"?"Applied":element.jobs.status}</Text> */}
                                            <Icon
                                                name='keyboard-arrow-down'
                                                color='#00aced' />
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                    <View style={{backgroundColor:'#f7fcfe'}}>

                                   
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 17 }}>Sent on : {new Date(element.jobs.date).toUTCString()} </Text>
                                        </View>
                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginVertical: 5 }}></View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 17, flexWrap: 'wrap', flex: 1 }}>Message : {element.jobs.message}</Text>
                                        </View>
                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%", marginTop: 5 }}></View>
                                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                            <Text style={{ width: "30%", fontSize: 17 }}>Price</Text>
                                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                            <Text style={{ width: "70%", fontSize: 17 }}>{element.jobs.quotation}</Text>
                                        </View>
                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

                                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                                            <Text style={{ width: "30%", fontSize: 17 }}>Date</Text>
                                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                                            <Text style={{ width: "70%", fontSize: 17 }}>{new Date(element.jobs.quotation_DATE).toDateString()}</Text>
                                        </View>
                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                                        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: 5 }}>
                            <Text style={{ width: "30%", fontSize: 17 }}>Job</Text>
                            <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                            <View style={{ width: "35%", }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            dialogTitle: "Checklist "+element.jobs.checklistId,
                                            dialog: true,
                                            checklist:element.checkLists,
                                            statustype:element.jobs.status
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
                                           this.completeJob(element.jobs.jobId,true)
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>Mark Complete</Text>
                                    </TouchableOpacity>
                                </View> :
                                element.jobs.status == "COMPLETE"? 
                                <View style={{ width: "35%", }}>

                                   
                                        <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold' }}>Completed</Text>
                                    
                                </View> 
                                
                                :element.jobs.status == "REQUEST"? 
                                <View style={{ width: "35%", }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                        //    this.completeJob(element.jobs.jobId,true)
                                        this.cancelRequest(element.jobs.jobId,true)
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold' }}>Cancel Request</Text>
                                    </TouchableOpacity>
                                </View>: null
                            }
                        </View>
                                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>

</View>
                                    </CollapseBody>
                                </Collapse>
                                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                            </View>
                        )
                    }) :<Text style={{color:'grey',alignSelf:'center'}}>No Jobs Found</Text> 
                }
            </View>
        )
    }
    render() {
        let categoryarr=[];
        this.state.checklist.categories!=null?this.state.checklist.categories.map((element,index)=>{
        categoryarr.push(element.categoryName+" ")
        }):null

        return (
            <View style={{ flex: 1, marginHorizontal: "5%" }}>
                <Spinner
                    color="#003171"
                    visible={this.state.spinner}
                    textContent={'Loading Jobs . .'}
                    textStyle={{ color: "#003171" }}

                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                        color="gold"
                          onRefresh={this.refreshData}
                          refreshing={this.state.refresh}
                        />
                    }
                >
                     {
                  !this.state.refresh?<Image
                  source={require("../../assets/refresh.png")}
                  style={{ width: "100%",height: 20 ,marginVertical:5 }}
                  resizeMode="contain"
                 ></Image>:null
              }
                    {
                        this.jobs("Request")
                    }

                </ScrollView>
                <Dialog.Container visible={this.state.dialog}>
                    <Dialog.Title >{this.state.dialogTitle}</Dialog.Title>
                    <Dialog.Description>
                    <View style={{ height:'60%',marginHorizontal:10,width:"90%" ,flexDirection: 'column' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                          <Text style={{ fontWeight: '700', fontSize: 13 ,width:"50%"}}>Description: </Text>
                          <Text style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{ this.state.checklist.demageDesc}</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                        <View style={{height:45, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                          <Text style={{ fontWeight: '700', fontSize: 13 ,width:"50%"}}>Category :</Text>
                          <Text style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{categoryarr}</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                        <View style={{ height: 280, flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginHorizontal: 5 }}>
                          <Text style={{ fontSize: 13, fontWeight: '500' }}>Photos :</Text>

                          <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                              {
                                this.state.checklist.photo != "" && this.state.checklist.photo != null  ? this.state.checklist.photo.map((imgdata, index) => {
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
                          {/* <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', height: 40, width: "95%", alignItems: 'center', marginBottom: "3%", shadowOffset: { width: 5, height: 5, },
                            shadowColor: '#003171',
                            shadowOpacity: 0.2,
                          }}>
                            <Text></Text>
                            <TouchableOpacity onPress={() => {
                              this.setState({ 
                                dialog: false ,
                                // checklistId:this.state.checklist.checklistId
                              
                              })
                              console.log("send quote");
                            }}>

                              <Text style={{ color: 'red', fontSize: 20, fontWeight: '600' }}>Cancel Quote</Text>
                            </TouchableOpacity>
                          </View> */}
                        </View>
                      </View>

                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            dialog: false
                        })
                    }} label="Hide" />

                </Dialog.Container>

                <SnackBar visible={this.state.snackbar} textMessage={this.state.snackbarmsg} backgroundColor={this.state.snackbarstatus} actionHandler={() => { this.setState({ snackbar: false }) }} actionText="Hide" />
            </View>

        )
    }
}