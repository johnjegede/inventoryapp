import React,{useState} from 'react';
import {View, Text, StyleSheet,Pressable,TextInput,Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './Dashboard'
import AddItem from './AddItem'
import DisplayItem from './DisplayItem'
import EditItem from './EditItem'
import Inventory from './Inventory'

const Stack = createNativeStackNavigator();



export default function StackNav(){
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


//  headerLeft: () => (
//         <Button title="Inventory" onPress={()=>navigation.navigate('Inventory')} />
//         ),<Stack.Screen name="Dashboard" component={Dashboard} />