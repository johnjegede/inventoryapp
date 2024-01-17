import * as React from 'react'
import {View, Text, StyleSheet,Pressable} from 'react-native';
import PageHeading from '../components/PageHeading'


export default function Dashboard({navigation}) {

  return(
    <View style={pageStyle.container}>
      {/* <PageHeading name="Dashboard" edit={false}/> */}
        <View style= {pageStyle.listInven}>
        <Text style={pageStyle.textItem}> Number of Inventory items </Text>
        <Text style={pageStyle.textNum}> 20 </Text>
        </View>

      <View style= {pageStyle.list2}>
        <Pressable style= {pageStyle.listStock}>
        <Text style={[pageStyle.textItem,{color:'green'}]} >In Stock</Text>
        <Text style={pageStyle.textNum}>18</Text>
        </Pressable>
        <Pressable style= {pageStyle.listStock}>
        <Text style={[pageStyle.textItem,{color:'red'}]} >Out Of Stock</Text>
        <Text style={pageStyle.textNum}>2</Text>
        </Pressable>
      </View>
      <Pressable onPress={()=>navigation.navigate('AddItem')}
       style={pageStyle.button1}>
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
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 60,
    marginVertical: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    elevation: 5,

  },
})