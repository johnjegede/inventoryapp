import { View, Text, Button } from 'react-native'
import React from 'react'
import { authenticate } from "../firebaseConfig";

const List = ({navigation}) => {
    const auth = authenticate
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>List</Text>
      <Button onPress={()=>navigation.navigate('Details')} title="open Details" />
      <Button onPress={()=>auth.signOut()} title="Logout" />
    </View>
  )
}

export default List