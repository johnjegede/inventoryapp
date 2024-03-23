import React,{useState} from 'react';
import {View, Text, StyleSheet,Pressable,TextInput,Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons'; 

import Dashboard from './Dashboard'
import AddItem from './AddItem'
import DisplayItem from './DisplayItem'
import EditItem from './EditItem'
import Inventory from './Inventory'
import LoginPage from "../components/LoginPage";
import Register from "../components/Register";
import MoveSreen from "../components/MoveSreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()



 function StackNav(){
  return(
    <Stack.Navigator initialRouteName="Inventory">
    
    <Stack.Screen name="AddItem" component={AddItem} />
    <Stack.Screen name="Inventory" component={Inventory} />
    <Stack.Screen name="DisplayItem" component={DisplayItem} 
    options={({navigation}) => ({
      headerShown:true,
      
      })}  />
    <Stack.Screen name="EditItem" component={EditItem} options={{headerShown:true}}/>
    
    </Stack.Navigator>
  )
  
}

 function InventoryTabNav(){
  return(
    <Tab.Navigator 
    initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: "10%",
          padding: 0,
        },
      }}>
     <Tab.Screen name="Dashboard" component={Dashboard} //Dashboard Inventory
     options={{
          tabBarIcon: ({ focused,color, size }) => (
            <View
            style={{
              borderWidth: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              padding: 10,
            }}
          >
            {focused ? (
              <MaterialIcons name="dashboard" size={30} color="red" />
            ) : (
              <MaterialIcons name="dashboard" size={30} color="black" />
            )}
            <Text
              style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
            >
              Home
            </Text>
          </View>
          ),
          headerShown:true
        }}/>
     <Tab.Screen name="Inventor" component={StackNav} 
     options={{
          tabBarIcon: ({ focused,color, size }) => (
            <View
            style={{
              borderWidth: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              padding: 10,
            }}
          >
            {focused ? (
              <MaterialIcons name="inventory" size={30} color="red" />
            ) : (
              <MaterialIcons name="inventory" size={30} color="black" />
            )}
            <Text
              style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
            >
              Inventory
            </Text>
          </View>
          ),
          headerShown:false
        }}/>
     <Tab.Screen name="AddItem"  component={AddItem}
     options={{
          tabBarIcon: ({ focused,color, size }) => (
            <View
            style={{
              borderWidth: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              padding: 10,
            }}
          >
            {focused ? (
              <MaterialIcons name="add-circle-outline" size={30} color="red" />
            ) : (
              <MaterialIcons name="add-circle-outline" size={30} color="black" />
            )}
            <Text
              style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
            >
              AddItem
            </Text>
          </View>
          ),
          headerShown:true
        }}/>
    
    </Tab.Navigator>

  )
}

const InventStack = createNativeStackNavigator();

function ScheduleStackNav(){
  return(
    <InventStack.Navigator initialRouteName="LoginPage">
    <InventStack.Screen
      name="LoginPage"
      component={LoginPage}
      options={{ headerShown: false }}
    />
    <InventStack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: true }}
    />
    <InventStack.Screen
      name="HomeScreen"
      component={MoveSreen}
      options={{ headerShown: false }}
    />
  </InventStack.Navigator>
  )
}

export { InventoryTabNav, ScheduleStackNav }

//  headerLeft: () => (
//         <Button title="Inventory" onPress={()=>navigation.navigate('Inventory')} />
//         ),<Stack.Screen name="Dashboard" component={Dashboard} />