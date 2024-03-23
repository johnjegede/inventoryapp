import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createStackNavigator } from "@react-navigation/stack"
// import AssetExample from './components/AssetExample';
import Dashboard from './pages/Dashboard'
import AddItem from './pages/AddItem'
import DisplayItem from './pages/DisplayItem'
import EditItem from './pages/EditItem'
import Inventory from './pages/Inventory'
import { InventoryTabNav, ScheduleStackNav} from './pages/StackNav'
import Facilites from './pages/facilities';



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()






export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Facilites} />
        <Stack.Screen name="Invent" component={InventoryTabNav} />
        <Stack.Screen name="Schedul" component={ScheduleStackNav} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

    // <View style={styles.container}>
     
    //   <Inventory />
      
    // </View>
//  <Tab.Screen />
 // <Text>Open up App.js to start working on your app!</Text>