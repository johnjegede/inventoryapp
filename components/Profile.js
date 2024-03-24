import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import moment from "moment";
import { authenticate, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const avail = ["2024-03-16", "2024-03-17", "2024-03-18", "2024-03-19"];
const sche = ["2024-03-17", "2024-03-18"];

export default function Profile({ navigation }) {
  const [userDetails, useUserDetails] = useState({});
  const [userVal, useUserVal] = useState("");
  const auth = authenticate;
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        useUserVal(uid);
        // console.log("user logged in", user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          useUserDetails(docSnap.data());
          // console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("user is signedout");
        navigation.navigate("LoginPage");
      }
    });

    return unsubscribe;
  }, [isFocused]);

  return (
    <View style={pageStyle.container}>
      <ScrollView>
      
      <View style={pageStyle.info}>
        <Text style={pageStyle.text1}>Name </Text>
        <Text style={pageStyle.text2}>{userDetails.fullname} </Text>

        <Text style={pageStyle.text1}>Email</Text>
        <Text style={pageStyle.text2}>{userDetails.email}</Text>

        <Text style={pageStyle.text1}>Phone number</Text>
        <Text style={pageStyle.text2}>{userDetails.phonenumber}</Text>

        <Text style={pageStyle.text1}>Date of Birth</Text>
        <Text style={pageStyle.text2}>{userDetails.dob}</Text>
      </View>

      <View style={pageStyle.info1}>
        <Text>Your Availability</Text>
        <View>
          {userDetails.availability &&
            userDetails.availability.map((date, index) => (
              <Text key={index}>
                {moment(date).format("dddd, MMMM Do YYYY,")}
              </Text>
            ))}
        </View>
      </View>

      <View style={pageStyle.info1}>
        <Text>Your Schedule</Text>
        <View>
          {userDetails.schedule ? (
            userDetails.schedule.sort().map((date, index) => (
              <Text key={index}>
                {moment(date).format("dddd, MMMM Do YYYY,")}
              </Text>
            ))
          ) : (
            <Text>Not scheduled for next month </Text>
          )}
        </View>
      </View>

      <View style={pageStyle.viewButton}>
        <Pressable style={pageStyle.press} onPress={() => auth.signOut()}>
          <Text style={pageStyle.presstext}>Logout</Text>
        </Pressable>
        <Pressable
          style={pageStyle.press}
          onPress={() =>
            navigation.navigate("Edit", {
              userDetails: userDetails,
              userId: userVal,
            })
          }
        >
          <Text style={pageStyle.presstext}>Edit</Text>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 0.9,
    borderWidth: 2,
    // marginBottom: 80,
  },
  info: {
    // height: "50%",
    backgroundColor:"#F5Eddc",
    padding: 20,
    borderRadius:20,
    width:'100%',
  },
  info1: {
    // height: "20%",
    borderWidth: 2,
    padding: 10,
  },
  text1: {
    fontSize: 14,
    color:"black",
  },
  text2: {
    borderColor:"#16213E",
    borderRadius:10,
    padding:10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    fontSize:18,
  },
  viewButton: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
  press: {
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 0,
    marginHorizontal: 10,
    marginVertical: 5,
    width: "40%",
    justifyContent: "center",
  },
  presstext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
