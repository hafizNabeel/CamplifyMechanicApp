import React from 'react'
import { View, Text, useWindowDimensions,Image } from 'react-native'
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
             return <AvailableJobs userId={props.userId}/>;
          case 'second':
            return <MechanicJobsSummary userId={props.userId}/>;
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
          style={{backgroundColor:'#003171'}}
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
      
<View style={{flex:1}}>
<View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',alignSelf:'center',backgroundColor:'#003171',height:"8%",width:"100%"}}>
  {/* <Text style={{fontSize:20,fontWeight:'500',color:'white',alignSelf:'flex-end',}}>Camplify</Text> */}
                <Text style={{fontSize:15,fontWeight:'200',color:'white',alignSelf:'flex-end'}}>Mechanic Dashboard</Text>
</View>

          <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
          />
      </View>
        
    )

}