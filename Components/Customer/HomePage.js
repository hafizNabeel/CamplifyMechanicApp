import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import SnackBar from 'react-native-snackbar-component'

import Stepone from "./CheckList/StepOne";
import StepTwo from "./CheckList/StepTwo";
import StepOne from "./CheckList/StepOne";
import StepThree from "./CheckList/StepThree";
import StepFour from "./CheckList/StepFour";
import StepFive from "./CheckList/StepFive";
import StepSix from "./CheckList/StepSix";
import FinalMessage from "./CheckList/FinalMessage";
import Logout from "../Registration/Logout";
import { Icon } from 'react-native-elements'
import UserAvatar from 'react-native-user-avatar';
import JobRequests from "./jobrequests";
import JobSummary from "./jobsummary";
import Incident from "./incidents";
const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text style={{ fontSize: 25, color: "#003171", fontWeight: "600" }}>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
);

// ------------- Home Screen -------------------------
const Home = ({ navigation }, props) => {


  return (

    <View style={styles.container}>
      <Header name="Camplify" openDrawer={navigation.openDrawer} />
      <Image
        source={require("../../assets/motorhome.png")}
        style={{ width: "80%", height: "30%" }}
        resizeMode="contain"
      />
      <View style={{
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
      }}>
        <Text style={{ padding: 20, flexWrap: 'wrap', fontSize: 17, flex: 1 }}>
          Camplify is proud to be Australia’s largest and fastest-growing campervan, motorhome and caravan sharing community. We’re safely connecting holidaymakers with thousands of unique neighbourhood vans that are available to hire for their next outdoor adventure. Explore some of our featured campervans, motorhomes and caravans available for hire.
        </Text>
      </View>
    </View>

  );
}
function Item({ item, navigate, navigation }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.toggleDrawer();
        navigate(item.name)
      }}
    >
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("sidebar", this.props);
  }

  // ----------- Navigation Drawer Routes
  state = {
    routes: [
      {
        name: "Home",
        icon: "ios-home",
      },
      {
        name: "Checklist",
        icon: "ios-list",
      },
      {
        name: "JobRequests",
        icon: "ios-person-add-outline"
      },
      // {
      //   name: "Notifications",
      //   icon: "ios-notifications-outline"
      // },
      {
        name: "JobSummary",
        icon: "ios-logo-buffer"
      },
      {
        name: "Incidents",
        icon: "ios-list",
      },
      {
        name: "LogOut",
        icon: "ios-log-out",
      },
    ],
  };
  render() {
    return (

      <View style={styles.container}>
        <UserAvatar size={100} name={this.props.screenProps.name} />
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
          {this.props.screenProps.name}
        </Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>{this.props.screenProps.email}</Text>
        <View style={styles.sidebarDivider}></View>
        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={this.state.routes}
          renderItem={({ item }) => (
            <Item item={item} navigate={this.props.navigation.navigate} navigation={this.props.navigation} />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}

const Drawer = createDrawerNavigator(
  // Providing Navigation Drawer Screen/Components ----------
  {
    Home: { screen: Home },
    Checklist: { screen: StepOne },
    JobRequests: { screen: JobRequests },
    // Notifications: { screen: Notifications },
    JobSummary: { screen: JobSummary },
    StepTwo: { screen: StepTwo },
    StepThree: { screen: StepThree },
    StepFour: { screen: StepFour },
    StepFive: { screen: StepFive },
    StepSix: { screen: StepSix },
    FinalMessage: { screen: FinalMessage },
    Incidents: { screen: Incident },
    LogOut: { screen: Logout },
  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    initialRouteParams: { switchmodule: "" },
    headerMode: "none",
    contentComponent: (props) => <Sidebar {...props} />,
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer",
    initialRouteParams: { switchmodule: "" },
    headerMode: "none",
    unmountInactiveRoutes: true,
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

  }
  // ----- Passing Parent Data to Childs via ScreenProps --------
  render() {
    return <AppContainer screenProps={{ switchmodule: this.props.switchmodule, name: this.props.name, email: this.props.email, userId: this.props.userId }} />;
    // <View>
    //   <SnackBar visible={true} textMessage="Hi there" backgroundColor="green" actionHandler={() => { this.setState({ snackbar: false }) }} actionText="Hide" />
    // </View>

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1,
  },
  listItem: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    marginLeft: 20,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  sidebarDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
});
