import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
// import AssetExample from './components/AssetExample';
import Dashboard from './pages/Dashboard'
import AddItem from './pages/AddItem'
import DisplayItem from './pages/DisplayItem'
import EditItem from './pages/EditItem'
import Inventory from './pages/Inventory'
import StackNav from './pages/StackNav'


const Tab = createBottomTabNavigator()

export default function App() {
  return (

    <NavigationContainer>
    <Tab.Navigator 
    // initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
     <Tab.Screen name="Dashboard" component={Dashboard} //Dashboard
     options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
          headerShown:true
        }}/>
     <Tab.Screen name="Inventor" component={StackNav} 
     options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" color={color} size={size}  />
          ),
          headerShown:false
        }}/>
     <Tab.Screen name="AddItem"  component={AddItem}
     options={{
          tabBarLabel: 'AddItem',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={size} />
          ),
          headerShown:true
        }}/>
    
    </Tab.Navigator>
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