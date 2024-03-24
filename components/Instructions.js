import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { View, Text, Button, StyleSheet } from "react-native";

import { Table, Row, Rows } from "react-native-table-component";

var tablehead = ["AREA/ITEM", "TASKS"];
var tableData = [
  ["", ""],
  ["Auditorium", ""],
  ["Floors", "Swept always, no exception; mopped with discretion"],
  ["Stage", "Swept always, no exception (with red mop or Swiffer)"],
  ["Media Room", "Swept always, no exception; mopped with discretion"],
  ["", ""],
  ["Hallway & overFlow Area", ""],
  ["Floors", "Swept always, no exception; mopped with discretion"],
  ["Garbages", "Removed always, no exception"],
  ["", ""],
  ["kids Rooms", ""],
  ["Floors", "Swept and mopped always, no exception (with red mop or Swiffer)"],
  ["Garbages", "Removed always, no exception"],
  ["", ""],
  ["WashRooms", ""],
  ["Mirrors", " Wiped with Windex and papertowels"],
  ["Sinks / Basins", "Disinfected with Lysol and papertowels"],
  ["Toilet Bowls", "Scrubbed; Disinfected with Lysol and papertowel"],
  ["Floors", "Swept and mopped always no exception"],
  ["Walls and Doors", "Disinfected with Lysol and papertowels"],
  ["Gargages", "Removed always, no exception"],
];
{
  /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */
}

export default function Instructions() {
  return (
    <View style={pageStyle.container}>
      <ScrollView style={pageStyle.container}>
      <View style={{ borderWidth:2, margin:2}}>
        <Text style={pageStyle.instruc}>Instructions</Text>
        <View style={pageStyle.table}>
          <View style={pageStyle.leftcol}>
            <Text style={pageStyle.textHeader}>AREA/ITEM</Text>
          </View>
          <View style={pageStyle.rightcol}>
            <Text style={pageStyle.textHeader}> TASKS</Text>{" "}
          </View>
        </View>
        {tableData.map((data, index) => {
          return (
            <View
              key={index}
              style={pageStyle.table}
            >
              <View style={pageStyle.leftcol}>
               
                <Text style={[pageStyle.leftText, (index == 1 || index == 6 || index == 10 || index == 14) && {fontSize: 20,} ]}>{data[0]}</Text>
              </View>
              <View style={pageStyle.rightcol}>
                <Text style={pageStyle.rightText}> {data[1]}</Text>{" "}
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ borderWidth:2}}>
        <Text style={pageStyle.instruc}>Notes:</Text>
        <Text style={pageStyle.notesText}>
          {" "}
          {"\u2022"}Captains are responsible for implementing {"\n"}
          and checking items on scope for Saturday shifts {"\n"}
          {"\u2022"} Sunday shifts are responsible for setting thermostat dial{" "}
          {"\n"}
          (pre and post service), ensuring no stray/hazardous obstructions{" "}
          {"\n"}
          and last-person duties (including speed signs)
        </Text>
      </View>
      </ScrollView>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  instruc:{
    borderBottomWidth:2,
    fontSize:30,
    fontWeight:"bold",
    textTransform:'uppercase'
  },

  textHeader:{
    fontSize:16,
    fontWeight:'bold'
  },
  notes:{
    borderWidth:2,
    marginTop:5,
    margin:2,
  },
  rightcol:{
    width: "70%", alignSelf: "stretch", borderLeftWidth:2
  },
  leftcol:{
    width: "30%", alignSelf: "stretch"
  },
  table:{
    alignSelf: "stretch", flexDirection: "row", borderBottomWidth:2
  },
  leftText:{
  fontSize: 16
  },
  rightText:{
    fontSize: 16
  },
  notesText:{
    fontSize:16
  }
});
