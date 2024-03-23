import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function PageHeading({
  name,
  edit,
  search,
  navigation,
  itemDetails,
  searchItem,
  setSearchItem
}) {
  
  

  return (
    <View style={[pageStyle.container,{justifyContent: edit ? 'flex-end' :'center'}]}>
      <Text style={pageStyle.itemText}>{name}</Text>
      {edit && (
        <Pressable
          onPress={() =>
            navigation.navigate("EditItem", { itemData: itemDetails })
          }
          style={pageStyle.button}
        >
          <Text style={pageStyle.text}> Edit Item </Text>
        </Pressable>
      )}
      {search && (
        <View style={pageStyle.searchBar}>
         {<FontAwesome5 name="search" size={24} color="black" />}
          <TextInput
            style={pageStyle.input}
            value={searchItem}
            placeholder={"search"}
            onChangeText={ setSearchItem}
          />
          <Pressable onPress={() => setSearchItem("") } >
          {<MaterialIcons name="cancel" size={24} color="black" />}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    height: "8%",
    borderBottomWidth: 2,
    justifyContent: "center",
    borderBottomColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    color: "black",
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    // height: 40,
    width: "80%",
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    padding: 5,
    fontSize: 20,
    borderColor: "EDEFEE",
    backgroundColor: "#F4CE14",
  },
  searchBar: {
    width: "80%",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "white",
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems:'center',
    backgroundColor: "#F4CE14",
    marginHorizontal:10,
  },
  innerContainer: {
    padding: 2,
    backgroundColor: "white",
    borderWidth: 0,
  },
});

{
  /* <TextInput
style={pageStyle.input}
value={searchIteam}
placeholder={"search"}
onChangeText={onChangeSearchItem}
/> */
}

// <SearchBar
// containerStyle={pageStyle.searchBar}
// placeholder={"Type Here..."}
// onChangeText={onChangeSearchItem}
// value={searchIteam}
// searchIcon={<FontAwesome5 name="search" size={24} color="black" />}
// cancelIcon={<MaterialIcons name="cancel" size={24} color="black" />}
// inputContainerStyle={pageStyle.innerContainer}
// //  leftIconContainerStyle={pageStyle.innerContainer}
// inputStyle={pageStyle.input}
// />
