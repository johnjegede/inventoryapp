import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import moment from "moment";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import Calendar from "./Calendar";
var currSchedule = [];
var peopleSchedule = [];

export default function Schedule() {
 var arrows = false;
 var nextMonth = false;
 var singleSelect = true;

  const [serveDate, setServeDate] = useState([]);
  // const [peopleSchedule, setPeopleSchedule] = useState([]);

  var nextmontVal = moment().month();
  var refid = moment().month(nextmontVal).format("MMMMYYYY");

  useEffect(() => {
    const getdocument = async () => {
      const docSnap = await getDoc(doc(db, "schedule", refid));

      if (docSnap.exists()) {
        // console.log("Schedule data:", docSnap.data().days);
        currSchedule = docSnap.data().days;
      }
    };
    getdocument();
  }, []);

  var valDate = serveDate;
  for (var i = 0; i < currSchedule.length; i++) {
   
    if (currSchedule[i].date == valDate[0]) {
      peopleSchedule=currSchedule[i].people;
      break
      
    }else {

        peopleSchedule=[]
    }
  }
  
  //  console.log("serveDate",valDate)

  return (
    <View style={pageStyle.container}>
      <View style={{flex:1.5, margin:0, borderWidth:0, marginTop:0}}>
      <Calendar
        arrows={arrows}
        nextMonth={nextMonth}
        singleSelect={singleSelect}
        serveDate={serveDate}
        setServeDate={setServeDate}
      />
      </View>
      <View style={{ flex: 1, margin: 0 ,borderRadius:10}}>
        <ScrollView style={{ borderWidth: 2, flex: 1 }}>
          <Text> People Schedule for this Day </Text>
          <Text>{valDate.length !==0 && (moment(valDate[0]).format("dddd Do MMMM YYYY"))}</Text>
          <Text>{peopleSchedule.length == 0  && ("No person has been scheduled")}</Text>
           
          {peopleSchedule.map((person, index) => {
            return (
              <View key={index}>
                <Text>{person}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 0.9,
  },
});


// var months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
