import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Profile from "./Profile";
import Edit from "./Edit";
import Instructions from './Instructions';
import Availability from "./Availability";
import Plan from "./Plan";
import Schedule from "./Schedule";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

function StackNav() {
  return (
    <stack.Navigator initialRouteName="Profile">
      <stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      ></stack.Screen>
      <stack.Screen name="Edit" component={Edit}></stack.Screen>
    </stack.Navigator>
  );
}

function HomeNav() {
  return (
    <stack.Navigator initialRouteName="Home">
      <stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen name="Availability" component={Availability}></stack.Screen>
      <stack.Screen name="Plan" component={Plan}></stack.Screen>
    </stack.Navigator>
  );
}

export default function MoveSreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: 60,
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home Screen"
        component={HomeNav}
        options={{
          tabBarIcon: ({ focused }) => (
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
                <Feather name="home" size={30} color="red" />
              ) : (
                <Feather name="home" size={30} color="black" />
              )}
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
              >
                Home
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused }) => (
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
                <MaterialIcons name="schedule" size={30} color="red" />
              ) : (
                <MaterialIcons name="schedule" size={30} color="black" />
              )}
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
              >
                Schedule
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Instructions"
        component={Instructions}
        options={{
          tabBarIcon: ({ focused }) => (
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
                <MaterialIcons name="notes" size={30} color="red" />
              ) : (
                <MaterialIcons name="notes" size={30} color="black" />
              )}
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
              >
                Instructions
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile Screen"
        component={StackNav}
        options={{
          tabBarIcon: ({ focused }) => (
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
                <AntDesign name="profile" size={30} color="red" />
              ) : (
                <AntDesign name="profile" size={30} color="black" />
              )}
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
              >
                Profile
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
