import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Agenda,
  Calendar,
  WeekCalendar,
  AgendaList,
} from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";

export default function CalAgenda() {
  
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
      style={{backgroundColor:'blue'}}
        selected="2024-02-10"
        
        renderEmptyData={() => {
            return <View />;
          }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: "blue",
    fontSize: 20,
  },
});


