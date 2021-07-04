import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Button, RefreshControl, TouchableOpacity, 
  TextInput, TouchableNativeFeedback, TouchableHighlight ,Platform} from 'react-native'
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
import SnackBar from 'react-native-snackbar-component'

export default class AvailableJobs extends React.Component {
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
      refresh: false,
      snackbar: false,
      snackbarmsg: "",
      snackbarstatus: "",
      showdatepicker:false
    }
    this.getChecklist = this.getChecklist.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.sendQuote = this.sendQuote.bind(this);
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
      } else this.getChecklist();
    } catch (error) {

    }

  }

  async sendQuote() {
    this.setState({ spinner: true })
    // const value = await AsyncStorage.getItem(String(this.props.userId)+"/"+"Checklist");
    // var decoded = jwt_decode(value);
    //   var userTypedecoded=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    //   var name=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    //   var email=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    //   var userId=decoded['jti']


    let params = {
      ChecklistId: this.state.checklistId,
      MechanicId: this.props.userId,
      // Status:"Request",
      Message: this.state.quotemsg,
      Quotation: parseInt(this.state.quote),
      Quotation_DATE: this.state.quotedate,
      Date: new Date()
    }
    console.log("in send quote request", params);
    axios({
      method: "post",
      url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/apply_job",
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
        // Authorization: `Bearer ${value}`,
      },
      data: params,
    }).then((response) => {
      // console.log("send quote response", response)
      this.setState({
        spinner: false,
        dialog: false,
        snackbar: true,
        snackbarmsg: "Success",
        snackbarstatus: 'green'
      })
    }).catch((e) => {
      console.log("send quote error", e)
      this.setState({
        spinner: false,
        snackbar: true,
        snackbarmsg: "Something Went Wrong",
        snackbarstatus: 'red'
      })
    })

  }

  // ------ This Method Gets Checklist of all customers from Server and Store it in the Cache --------------
  getChecklist() {
    this.setState({
      refresh: true
    })
    axios({
      method: "post",
      url: "http://adeelahmad01-001-site1.etempurl.com/api/Job/incident_list",
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
    this.getChecklist();
    try {
      const value = await AsyncStorage.getItem(String(this.props.userId) + "/" + "Checklist");
      // console.log("chached available jobs", JSON.parse(value));
      if (value != null) {
        this.setState({
          checklist: JSON.parse(value)
        })
      } else this.getChecklist();
    } catch (error) {

    }
  }

  render() {
    let categoryarr = [];

    return (
      <View>
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
              textContent={'Sending ..'}
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
                element.categories != "" ? element.categories.map((category) => {
                  categoryarr.push(category.categoryName + " ")
                }) : null
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
                          <Image
                            source={require("../../assets/job.png")}
                            style={{ width: "8%", height: "50%" }}
                            resizeMode="stretch"
                          ></Image>
                          <Text style={{ fontSize: 20, alignItems: 'center', color: "#003171" }}>{element.email!=null?"by  "+element.email:"by anonymous"}</Text>
                          <Icon
                            name='keyboard-arrow-down'
                            color='#00aced' />

                        </View>

                      </CollapseHeader>
                      <CollapseBody>
                        <View style={{ height: 360, flexDirection: 'column',backgroundColor:'#f7fcfe' }}>
                          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                            <Text style={{ fontWeight: '700', fontSize: 16 }}>Damage Description: </Text>
                            <Text style={{ fontSize: 15, flexWrap: 'wrap', flex: 1 }}>{element.demageDesc}</Text>
                          </View>
                          <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginHorizontal: 5 }}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: "30%" }}>Category :</Text>
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
                            <View style={{
                              flexDirection: 'row', justifyContent: 'space-between', height: 40, width: "95%", alignItems: 'center', marginBottom: "3%", shadowOffset: { width: 5, height: 5, },
                              shadowColor: '#003171',
                              shadowOpacity: 0.2,
                            }}>
                              <Text></Text>
                              <TouchableOpacity onPress={() => {
                                this.setState({
                                  dialog: true,
                                  checklistId: element.checklistId,
                                  quotedate:new Date(),
                                  showdatepicker:false

                                })
                                // console.log("send quote");
                              }}>

                                <Text style={{ color: '#003171', fontSize: 20, fontWeight: '600' }}>Send Quote</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </CollapseBody>
                    </Collapse>

                  </View>
                )
              }) : <Text style={{ color: 'grey', alignSelf: 'center' }}>No Jobs Found</Text>
            }

          </View>

          <Dialog.Container visible={this.state.dialog}>
            <Dialog.Title>Send Quote</Dialog.Title>
            <Dialog.Input label="Message" placeholder="optional" onChangeText={(text) => {
              this.setState({
                quotemsg: text
              })
            }}>

            </Dialog.Input>
            <Dialog.Input label="Price $" keyboardType="numeric" onChangeText={(text) => {
              this.setState({
                quote: text
              })
            }} />


            <View style={{ marginHorizontal: 20, marginBottom: 5, width: 300 }}>
          {
            Platform.OS!="ios"? 
           <TouchableOpacity
              
              onPress={()=>{
                this.setState({
                  showdatepicker:true
                })
              }}
              >
              <Text style={{color:"#003171",alignSelf:'flex-start',}}>Date : {this.state.quotedate!=undefined? this.state.quotedate.toDateString():new Date().toDateString()}</Text>
              </TouchableOpacity>:null } 
              {
               Platform.OS=="ios"?<DateTimePicker
               testID="dateTimePicker"
               value={this.state.quotedate}
               mode={'date'}
               // is24Hour={true}
               display="default"
               onChange={(event, selectedDate) => {
                 console.log("date time event",event)
                 event.type=="dismissed"?this.setState({quotedate:new Date()}):
                 this.setState({
                   quotedate: selectedDate,
                   submitdisable: false,
                   
                 })
               }}
              
             /> :this.state.showdatepicker?
             
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.quotedate}
                mode={'date'}
                // is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  console.log("date time event",event)
                  event.type=="dismissed"?this.setState({quotedate:new Date(),showdatepicker:false}):
                  this.setState({
                    quotedate: selectedDate,
                    submitdisable: false,
                    showdatepicker:false
                  })
                }}
               
              />:null }
            </View>
            <Dialog.Button onPress={() => {
              this.setState({
                dialog: false,
                showdatepicker:false,

              })
            }} label="Cancel" />
            <Dialog.Button
              onPress={() => {
                // this.setState({
                //   dialog: false
                // })
                // console.log("sq pressed")
                this.sendQuote();
              }}
              disabled={this.state.quote == 0 ? true : false}
              color={this.state.quote == 0 ? 'grey' : 'green'}
              label="Send" />
          </Dialog.Container>

          <Dialog.Container visible={this.state.showimage}>
            <Dialog.Title>Image</Dialog.Title>
            <Image
              source={{ uri: this.state.showimgdata }}
              source={{ uri: String(this.state.showimgdata).includes("data:image/jpeg;base64,") ? this.state.showimgdata : "data:image/jpeg;base64," + this.state.showimgdata }}
              style={{ width: 250, height: 400, alignSelf: 'center', resizeMode: 'contain', borderWidth: 1,backgroundColor:'white' }}
            >

            </Image>

            <Dialog.Button onPress={() => {
              this.setState({
                showimage: false
              })
            }} label="Hide" />

          </Dialog.Container>
        </ScrollView>
        <SnackBar visible={this.state.snackbar} textMessage={this.state.snackbarmsg} backgroundColor={this.state.snackbarstatus} actionHandler={() => { this.setState({ snackbar: false }) }} actionText="Hide" />
      </View>
    )
  };
}