import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet,Pressable} from 'react-native';
import PageHeading from '../components/PageHeading'
import { useIsFocused } from '@react-navigation/native';
import {db} from '../firebaseConfig';
import {collection, getDocs} from 'firebase/firestore'
import { MaterialIcons } from '@expo/vector-icons';


export default function Dashboard({navigation}) {

  const isFocused = useIsFocused();
  const [listitem, setListitem] = useState([])

  useEffect(()=>{
    let listItemstock = []

    const getData = async ()=>{
      const querySnapshot = await getDocs(collection(db,'stock'));
      querySnapshot.forEach((doc) =>{
        listItemstock.push({...doc.data(), id: doc.id})
      })
      // console.log(listItemstock)
      setListitem(listItemstock)
    }
    isFocused && getData()


  },[isFocused])

  const total =listitem.length
  const inStock = listitem.filter((value)=> {
    return parseInt(value.itemAmount) > 0}).length
  // console.log(inStock)
  const outStock = listitem.filter((value)=> parseInt(value.itemAmount) <= 0).length

  return(
    <View style={pageStyle.container}>
      {/* <PageHeading name="Dashboard" edit={false}/> */}
        <View style= {pageStyle.listInven}>
        <Text style={pageStyle.textItem}> Number of items in Inventory that we have</Text>
        <Text style={pageStyle.textNum}> {total} </Text>
        </View>

      <View style= {pageStyle.list2}>
        <Pressable style= {pageStyle.listStock}>
        <Text style={[pageStyle.textItem,{color:'green'}]} >In Stock</Text>
        <Text style={pageStyle.textNum}>{inStock}</Text>
        </Pressable>
        <Pressable style= {pageStyle.listStock}>
        <Text style={[pageStyle.textItem,{color:'red'}]} >Out Of Stock</Text>
        <Text style={pageStyle.textNum}>{outStock}</Text>
        </Pressable>
      </View>
      <Pressable onPress={()=>navigation.navigate('AddItem')}
       style={pageStyle.button1}>
        <MaterialIcons name="add-circle" size={30} color="black" />
        <Text style={pageStyle.textAdd}>Add an item</Text>
      </Pressable>
    </View>


  )
}

const pageStyle = StyleSheet.create({
  container: {
     flex: 1,
  },
  listInven:{
    borderWidth: 2,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:32,
    marginHorizontal:34,
    paddingVertical:20,
    borderRadius:20
  },
    listStock:{
    borderWidth: 2,
    borderColor:'black',
    width:135,
    height: 135,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    

  },
  list2:{
    borderWidth: 0,
    borderColor:'red',
    flexDirection:'row',
    justifyContent: 'space-around',
    marginTop:32
  },
  textItem:{
    fontSize:20,
    textAlign:'center',
    

  },
  textNum:{
    fontSize:40,
    textAlign:'center',
  },
   textAdd:{
    fontSize:20,
    textAlign:'center',
    paddingLeft:10,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    margin: 'auto',
    width: "50%",
    // marginVertical: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    elevation: 5,
    flexDirection:"row"

  },
})