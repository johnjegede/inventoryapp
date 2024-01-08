import React,{useState} from 'react'
import {View, Text, StyleSheet,Pressable, Image,Button,FlatList,TouchableOpacity,Alert} from 'react-native';
import PageHeading from '../components/PageHeading';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];



const Item = ({item, onPress, backgroundColor, textColor, del}) => (
  <TouchableOpacity onPress={onPress} style={[pageStyle.item, {backgroundColor}]}>
    <View style ={pageStyle.thumb}>
    <Image />
    </View>
    <View style ={pageStyle.thumbtext}>
    <Text style={[pageStyle.title, {color: textColor}]}>{item.title}</Text>
    <View style ={pageStyle.thumbicon}>
    <Ionicons name="add-circle-outline" size={34} color="black" />
    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:24}}>12</Text>
    <Pressable onPress={del}><MaterialIcons name="delete-forever" size={34} color="black" /></Pressable>
    </View>
    </View> 
    
  </TouchableOpacity>
);


export default function Inventory({ navigation }){

  const [selectedId, setSelectedId] = useState();
  let delVal = false

  const createTwoButtonAlert = () =>
    Alert.alert('You are deleting an item', 'Do you want to delet it', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed') 
          delVal = false
          console.log(delVal)
          },
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
        delVal = true
        console.log('OK Presse')
        console.log(delVal)
        }
        },
    ]);

  const renderItem = ({item}) => {
     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={()=> navigation.navigate('DisplayItem')}
         backgroundColor={backgroundColor}
        textColor={color}
        del = {createTwoButtonAlert}
      />
    );
  };

  const [istock, setIstock] = useState(true)
  const [ostock, setOstock] = useState(false)

  const ipressFunction =() =>{
   if(istock == false){
      setIstock(!istock)
      setOstock(false)
      }
  }

   const opressFunction =() =>{
 
  if(ostock == false){
      setOstock(!ostock)
      setIstock(false)
      }

  }
  return (
    <View style={pageStyle.container}>
    <PageHeading name='Inventory' search={true}/>

    <View style={pageStyle.view}>
    <View style={pageStyle.buttons}>
    <Pressable  onPress={ipressFunction} style={[pageStyle.text,istock ? pageStyle.press: pageStyle.unpress]} ><Text style={{textAlign:'center',fontWeight:'bold'}} >In Stock</Text></Pressable>
    <Pressable onPress={opressFunction} style={[pageStyle.text,ostock ? pageStyle.press: pageStyle.unpress]} ><Text style={{textAlign:'center',fontWeight:'bold'}}  >Out of Stock</Text></Pressable>
    </View>
    <View style={pageStyle.textNum}>
    <Text style={{textAlign:'center',fontWeight:'bold'}} >18</Text>
    </View>
    </View >
    <View style={pageStyle.flatlist}>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      </View>

    </View>
  )
}

const pageStyle = StyleSheet.create({
  container: {
     flex: 1,
  },
  view:{
    flexDirection:'row',
    marginTop:5,
    justifyContent:'space-between',
    height:'6%'
  },
  buttons:{
    
    flexDirection:'row',
    width:'80%',
    alignItems:'center',
    justifyContent:'space-evenly',
    marginHorizontal:10,
    backgroundColor:"#E0E0E0",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#E0E0E0",
  },
  text:{
     width:"50%",
    padding:6,
    marginLeft:0,
    height:"100%" ,
    justifyContent:'center',
  
   
  },
  press:{
    borderRadius:5,
    backgroundColor:'white',
     
  },
  unpress:{
    backgroundColor:"#E0E0E0",
      borderRadius:5,
  },
  textNum:{
    borderWidth:1,
    borderRadius:5,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red',
    width:'10%',
    marginHorizontal:10,
  },
   item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20,
    borderWidth:2,
    flexDirection:'row'

  },
  title: {
    fontSize: 20,
  },
  flatlist:{
    flex:1,
    borderWidth:2,
    borderRadius:20,
    margin:10,
  },
  thumb:{
    width: 80,
    height: 80,
    borderWidth:2,
    borderRadius:10,
  },
  thumbtext:{
    borderWidth:0,
    marginHorizontal:5,
    width:'70%',
    justifyContent:'space-between'
  },
  thumbicon:{
    flexDirection:'row',
    borderWidth:0,
    justifyContent:'space-between',
    paddingRight:10,
    alignItems:'center'
  }
})