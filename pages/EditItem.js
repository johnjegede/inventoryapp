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
import { getStorage,deleteObject , ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage, db} from "../firebaseConfig";
import uuid from "uuid";
import { collection,doc, updateDoc } from "firebase/firestore"; 
import NumInput from "../components/NumInput";
import { MaterialIcons } from '@expo/vector-icons';

var imgName = `images/image-${Date.now()}`

export default function EditItem({route,navigation}) {

    const itemData = route.params.itemData;
    // console.log(itemData)
  const [image, setImage] = useState(itemData.imageSrc);
  const [changeImage, setChangeImage] = useState(false);
  const [imageName, setImageName] = useState(itemData.imageName);
  const [itemName, onChangeItemName] = useState(itemData.itemName);
  const [amount, onChangeAmount] = useState(itemData.itemAmount);
  const [note, onChangeNote] = useState(itemData.itemNote);
  const prvImage = itemData.imageName

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
      // imgName = `images/image-${Date.now()}`
      console.log("imageName",imageName)
      const fileRef = ref(storage, imageName);
      const result = await uploadBytes(fileRef, blob);
      // We're done with the blob, close and release it
    //   blob.close();
      return await getDownloadURL(fileRef);
    } catch (error) {
        // console.log(error)
      alert(`Error: ${error}`);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageName(`images/image-${Date.now()}`)
      setChangeImage(true)
      
    }
  };

  const  updateDb = async ()=>{


    console.log("imageName",imageName)
    if(changeImage){
      var uploadUrl = await uploadImageAsync(image);
       // setImage(uploadUrl);
      //  console.log("uploadUrl",uploadUrl)
    console.log(prvImage)
    const deleteRef = ref(storage, prvImage);
    // console.log(deleteRef)
      await deleteObject(deleteRef).then(() => {
        // File deleted successfully
        console.log("file deleted")
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });
    }else{
      var uploadUrl = image;
    }
    
   

    try {
        console.log(itemData.id)
         await updateDoc(doc(db, "stock", itemData.id), {
          imageSrc: uploadUrl,
          imageName: imageName,
          itemAmount: amount,
          itemName: itemName,
          itemNote:note
        });
        setImage(null)
        onChangeAmount('')
        onChangeItemName('')
        onChangeNote('')
        // console.log("Document written with ID: ", docRef.id);
        alert(`Item saved successfully`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    
     

      navigation.navigate('Inventory');
  }

  return (
    <View style={pageStyle.container}>
      {/* <PageHeading name="Edit Item" /> */}
      <KeyboardAvoidingView
        style={pageStyle.container1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView  keyboardDismissMode="on-drag">
          <View style={pageStyle.imgContainer}>
            {image && (
              <Image source={{ uri: image }} style={pageStyle.imageStyle} />
            )}
          </View>
          <View>
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
           <NumInput count={amount} onChangeCount={onChangeAmount} />
          {/* <TextInput
            style={pageStyle.input}
            value={amount}
            placeholder={"Amount"}
            keyboardType={"numeric"}
            onChangeText={onChangeAmount}
          /> */}
          
            <TextInput
              style={pageStyle.messageInput}
              editable
              value={note}
              placeholder={"Note"}
              multiline
              numberOfLines={4}
              onChangeText={onChangeNote}
            />
            </View>
            <View
        style={{
          
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable style={pageStyle.logButton} onPress={updateDb}>
          <MaterialIcons name="save" size={24} color="black" />
          <Text style={pageStyle.logText}>Update Item</Text>
        </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    // height:"90%"
    flex: 0.9,
  },
  container1: {
    flex: 1,
  },

  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    height: 220,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
    width: "50%",
    height: "100%",
    borderWidth: 2,
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
  logButton: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 0,
    flexDirection: "row",
    backgroundColor: "#FF5D5D",
    width: "40%",
  },
  logText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
