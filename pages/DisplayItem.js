import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  Button,
  Alert,
} from "react-native";
import {collection,doc,deleteDoc,} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import {storage, db} from "../firebaseConfig";
import PageHeading from "../components/PageHeading";

export default function DisplayItem({ navigation, route }) {
  // const [delVal, setDelVal] = useState(false)
const itemData = route.params.itemData;
 console.log(itemData)
 const prvImage = itemData.imageSrc
 

const deleteDocu = async ()=>{
    await deleteDoc(doc(db, 'stock', itemData.id));
    // const storage = getStorage();
    const deleteRef = ref(storage, prvImage);
    console.log(deleteRef)
      await deleteObject(deleteRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });

    
        // let imageRef = storage.refFromURL(prvImage);
        // console.log("imageref: ",imageRef)
    //    imageRef.delete()
      navigation.navigate('Inventory');
}

  const changeVal = () => {
    console.log("Cancel Pressed");
  };

  const changeOk = () => {
    console.log("Ok Pressed");
    deleteDocu()
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

  const windowsAlert = () =>{
    const delValu = confirm("Do you want to delete an item");
    if (delValu == true) {
        alert("You pressed OK!");
        deleteDocu()
    }
    else {
        alert("You pressed Cancel!");
    }
  }

  return (
    <View style={pageStyle.container}>
      <PageHeading name="Display Item" edit={true} navigation={navigation} itemDetails={itemData} />
      <View style={pageStyle.imgContainer}>
        <Image style={pageStyle.imageStyle} source={{uri: itemData.imageSrc}} />
      </View>

      <View style={pageStyle.container1}>
        <Text style={pageStyle.text}>Name of Item</Text>
        <Text style={pageStyle.input}> {itemData.itemName}  </Text>

        <Text style={pageStyle.text}>Amount</Text>
        <Text style={pageStyle.input}>{itemData.itemAmount}</Text>

        <Text style={pageStyle.text}>Note</Text>
        <Text style={pageStyle.messageInput}>{itemData.itemNote}</Text>

        <Button
          color="red"
          title="Delete"
          onPress={Platform.OS === "ios" ? createTwoButtonAlert : windowsAlert}
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
