import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  Alert,
} from "react-native";
import PageHeading from "../components/PageHeading";

export default function DisplayItem({ navigation }) {
  // const [delVal, setDelVal] = useState(false)
  let delVal = false;
  const changeVal = () => {
    console.log("Cancel Pressed");
    delVal = false;
    console.log(delVal);
  };

  const changeOk = () => {
    console.log("Ok Pressed");
    delVal = true;
    console.log(delVal);
  };

  const createTwoButtonAlert = () => {
    Alert.alert("You are deleting an item", "Do you want to delete it", [
      {
        text: "Cancel",
        onPress: changeVal,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: changeOk,
      },
    ]);
  };

  return (
    <View style={pageStyle.container}>
      <PageHeading name="Display Item" edit={true} navigation={navigation} />
      <View style={pageStyle.imgContainer}>
        <Image style={pageStyle.imageStyle} src="" />
      </View>

      <View style={pageStyle.container1}>
        <Text style={pageStyle.text}>Name of Item</Text>
        <Text style={pageStyle.input}> </Text>

        <Text style={pageStyle.text}>Amount</Text>
        <Text style={pageStyle.input}></Text>

        <Text style={pageStyle.text}>Note</Text>
        <Text style={pageStyle.messageInput}></Text>

        <Button
          color="red"
          title="Delete"
          onPress={createTwoButtonAlert}
        ></Button>
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
  },

  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    height: 220,
    //  flex:0.4,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 80,
    margin: 12,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginHorizontal: 12,
  },
});
