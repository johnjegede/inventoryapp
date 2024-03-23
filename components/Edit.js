import React, { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { authenticate, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";

export default function Edit({ navigation, route }) {
  const details = route.params.userDetails;
  const uid = route.params.userId;
  const [name, onChangeName] = useState(details.fullname);
  const [email, onChangeEmail] = useState(details.email);
  const [phone, onChangePhone] = useState(details.phonenumber);
  const [dob, onChangeDob] = useState(details.dob);
  const [userVal, useUserVal] = useState("");
  const auth = authenticate;

  const updateCurrentUser = async () => {
    // const credential = promptForCredentials();

    await updateEmail(auth.currentUser, email)
      .then(() => console.log("user email updated"))
      .catch((error) => {
        console.log(error);
      });

    await updateDoc(doc(db, "users", uid), {
      fullname: name,
      email: email,
      phonenumber: phone,
      dob: dob,
    });
    alert(`profile updated`);
    navigation.goBack();
  };

  return (
    <View style={pageStyle.container}>
      <Text style={pageStyle.textDetails}>
        Edit your profile
      </Text>
      <View style={pageStyle.conview}>
        <Text style={pageStyle.text}>Name</Text>
        <TextInput
          style={pageStyle.inputext}
          value={name}
          onChangeText={onChangeName}
        ></TextInput>
        <Text style={pageStyle.text}>Email</Text>
        <TextInput
          style={pageStyle.inputext}
          value={email}
          onChangeText={onChangeEmail}
        ></TextInput>
        <Text style={pageStyle.text}>Phone Number</Text>
        <TextInput
          style={pageStyle.inputext}
          value={phone}
          onChangeText={onChangePhone}
        ></TextInput>
        <Text style={pageStyle.text}>Date of Birth</Text>
        <TextInput
          style={pageStyle.inputext}
          value={dob}
          onChangeText={onChangeDob}
        ></TextInput>
        <Pressable style={pageStyle.submitBtn} onPress={() => updateCurrentUser()}>
          <Text style={pageStyle.submitBtnTxt}>Save</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:"center",
    paddingHorizontal:15,
  },
  conview: {
    backgroundColor:"#F5Eddc",
    padding: 20,
    borderRadius:20,
    width:'100%',
  },
  conview2: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputext: {
    borderColor:"#16213E",
    borderRadius:10,
    padding:10,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  submitBtn: {
    borderWidth: 2,
    justifyContent: 'center', 
    borderRadius: 10,
    padding:10,
    marginHorizontal:40
  },
  submitBtnTxt: {
    color: 'black',
    textAlign:'center',
    fontSize:18,
    fontWeight:'700',
  },
  textDetails: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "left",
  },
});
