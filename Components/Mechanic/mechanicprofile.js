import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MechanicProfile extends React.Component {

    constructor(props) {
        super(props);
        this.handlelogout = this.handlelogout.bind(this);
    }
// ------------ Delete User Cahche and Redirects to Registration Screen ----------
    handlelogout = async () => {
        try {
            await AsyncStorage.removeItem("storage_Key", (err) => {
                console.log("logout status", err);
                this.props.logout();
            });
        } catch (e) { }
    }
    render() {


        return (
            <View style={{ flex: 1, alignItems: 'center', marginHorizontal: "5%" }}>


                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: "5%" }}>
                    <Text style={{ width: "30%", fontSize: 17 }}>Name : </Text>
                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                    <Text style={{ width: "70%", fontSize: 17 }}>{this.props.name}</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 2, marginHorizontal: "5%" }}>
                    <Text style={{ width: "30%", fontSize: 17 }}>Email : </Text>
                    <View style={{ backgroundColor: 'grey', width: 0.7, height: 40, marginRight: 20 }}></View>
                    <Text style={{ width: "70%", fontSize: 17 }}>{this.props.email}</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}></View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', height: 40, width: "95%", alignItems: 'center', marginVertical: "3%", shadowOffset: { width: 3, height: 3, },
                    shadowColor: 'red',
                    shadowOpacity: 0.3,
                }}>
                    <Text></Text>

                  
                    <TouchableOpacity onPress={() => {
                        this.handlelogout();
                        console.log("send quote");
                    }}>

                        <Text style={{ color: 'red', fontSize: 20, fontWeight: '600' }}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}