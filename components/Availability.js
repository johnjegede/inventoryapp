import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet,ScrollView,Pressable, TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { authenticate, db } from "../firebaseConfig";

import Calendar from './Calendar'



export default function Availability({navigation,route}){

var arrows =false;
 var nextMonth = true;
 var singleSelect = false

 var months = ["January", "February", "March", "April", 
     "May", "June", "July", "August", "September", "October", 
    "November", "December"
  ];

const [serveDate, setServeDate] = useState([])
const details = route.params.userDetails;
  const uid = route.params.userId;

var valDate = serveDate.sort()

//  console.log("serveDate",valDate)

const  onSave = async ()=>{
  await updateDoc(doc(db, "users", uid), {
    availability: serveDate.sort()

  });
  alert(`availability updated`);
  navigation.goBack();
}

  return (
    <View style={pageStyle.container}>

      <ScrollView  style={pageStyle.container1} centerContent={true} >
      <View style={{flex:3.5, margin:0, borderWidth:0, marginTop:0}}>
    <Calendar arrows={arrows} nextMonth = {nextMonth} singleSelect={singleSelect} serveDate={serveDate} setServeDate={setServeDate}/>
    </View>
    <View style={{flex:2, margin:2, borderWidth:2, marginTop:10, borderRadius:10,}}>
    <View style={{borderWidth:0, marginBottom:4}}>
      <Text> {details.fullname} You have selected the following days</Text>
     {valDate.map((dayVal,index)=>{
      var day = moment(dayVal).format('dddd Do MMMM YYYY')
     
    //   console.log(day)
      return(
        <View key={index}>
        <Text>{day}</Text>
        </View>
      )
    })}
    </View>
    
   </View>
   <View style={{justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity onPress={()=> onSave() } style={{padding:5, flexDirection:'row', borderWidth:0,borderRadius:20, width:"40%", justifyContent:'space-evenly', backgroundColor:"#c583bc",flex:1}}>
         <FontAwesome name="save" size={24} color="black" />
        <Text style={{fontSize:16}}>Save</Text></TouchableOpacity>
    </View>
   </ScrollView>
    </View>
  )
}

const pageStyle = StyleSheet.create({
  container:{
    // height:"90%",
    flex:0.9,
  },
  container1:{
    
    borderWidth:0,
    flex:0.5,
    // flexGrow: 1 ,
  }
})



//  <ScrollView>
//     {valDate.map((dayVal)=>{
//       var day = moment(dayVal).day()
//       var date = moment(dayVal).date()
//       console.log(day,date)
//       return(
//         <>
        
//         </>
//       )
//     })}
//     </ScrollView>