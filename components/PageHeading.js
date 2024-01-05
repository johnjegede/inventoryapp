import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function PageHeading({ name, edit, search }) {
  const [searchIteam, onChangeSearchItem] = useState("");

  return (
    <View style={pageStyle.container}>
      <Text style={pageStyle.itemText}>{name}</Text>
      {edit && (
        <Pressable style={pageStyle.button}>
          <Text style={pageStyle.text}> Edit Item </Text>
        </Pressable>
      )}
      {search && (
        <TextInput
          style={pageStyle.input}
          value={searchIteam}
          placeholder={"search"}
          onChangeText={onChangeSearchItem}
        />
      )}
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    height: "5%",
    marginTop: 50,
    borderBottomWidth: 2,
    justifyContent: "space-between",
    borderBottomColor: "black",
    flexDirection: "row",
  },

  itemText: {
    color: "black",
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",

    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#9CABC2",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 0,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#F4CE14",
  },
});
