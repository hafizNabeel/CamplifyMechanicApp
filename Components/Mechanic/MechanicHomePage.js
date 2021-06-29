import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import MechanicJobsSummary from './mechanicjobsSummary';
import AvailableJobs from './availablejobs';
import MechanicProfile from './mechanicprofile';


export default function MechanicHomePage (props) {
    const layout = useWindowDimensions();
console.log("mechaaaaaaaa",props.userId);
    const [index, setIndex] = React.useState(0);
    // -------------- Navigation Routes ----------------------
    const [routes] = React.useState([
        { key: 'first', title: 'Available Jobs' },
        { key: 'second', title: 'Jobs Summary' },
        { key: 'third', title: 'Profile' }
    ]);
// -------------- Logout Functionality ---- Tell Parent Component to Logout ------------------
    const handlelogout=()=>{
        console.log("im in handle logout mechanic");
        props.switchmodule("logout");
    }
      const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
             return <AvailableJobs></AvailableJobs>;
          case 'second':
            return <MechanicJobsSummary/>;
            case 'third':
                return <MechanicProfile name={props.name} email={props.email} logout={handlelogout}></MechanicProfile>
          default:
            return null;
        }
      }

      
      const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'gold' }}
          style={{marginTop:50,backgroundColor:'#003171'}}
          inactiveColor="white"
          activeColor="gold"
          onTabPress={({ route, preventDefault }) => {
            if (route.key === 'first') {
              preventDefault();
                    setIndex(0);
              // Do something else
            }else if(route.key === 'second'){
                preventDefault();
                setIndex(1);
            }
          }}
        />
      );

    

    return (
      

          <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
          />
      
        
    )

}