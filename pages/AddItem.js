import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PageHeading from "../components/PageHeading";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebaseConfig";
import uuid from "uuid";
import { collection, addDoc } from "firebase/firestore";

export default function AddItem() {
  const [image, setImage] = useState(null);
  const [itemName, onChangeItemName] = useState("");
  const [amount, onChangeAmount] = useState("");
  const [note, onChangeNote] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
      setImage(uploadUrl);
      console.log(uploadUrl);
    } else {
      setImage(null);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const fileRef = ref(storage, `images/image-${Date.now()}`);
      const result = await uploadBytes(fileRef, blob);
      // We're done with the blob, close and release it
      //   blob.close();
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
      alert(`Error: ${error}`);
    }
  }

  const addtoDb = async () => {
    try {
      const docRef = await addDoc(collection(db, "stock"), {
        imageSrc: image,
        itemAmount: amount,
        itemName: itemName,
        itemNote: note,
      });
      setImage(null);
      onChangeAmount("");
      onChangeItemName("");
      onChangeNote("");
      console.log("Document written with ID: ", docRef.id);
      alert(`Item saved successfully`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <View style={pageStyle.container}>
      {/* <PageHeading name="Add New Item" /> */}
      <KeyboardAvoidingView
        style={pageStyle.container1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={pageStyle.container1} keyboardDismissMode="on-drag">
          <View style={pageStyle.imgContainer}>
            {image && (
              <Image source={{ uri: image }} style={pageStyle.imageStyle} />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Pressable style={pageStyle.button} onPress={pickImage}>
              <Text style={pageStyle.text}>
                {" "}
                {image ? "Edit Image" : "Upload Image"}{" "}
              </Text>
            </Pressable>
            <TextInput
              style={pageStyle.input}
              value={itemName}
              placeholder={"Item Name"}
              onChangeText={onChangeItemName}
            />

            <TextInput
              style={pageStyle.input}
              value={amount}
              placeholder={"Amount"}
              keyboardType={"numeric"}
              onChangeText={onChangeAmount}
            />

            <TextInput
              style={pageStyle.messageInput}
              editable
              value={note}
              placeholder={"Note"}
              multiline
              numberOfLines={4}
              onChangeText={onChangeNote}
            />
            <Button onPress={addtoDb} color="blue" title="Save new Item" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    // paddingVertical:"0%",
    height: 220,
    borderColor:'blue'
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
    borderColor: "EDEFEE",
    backgroundColor: "#F4CE14",
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F4CE14",
  },
  button: {
    backgroundColor: "#9CABC2",
    textAlign: "left",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
