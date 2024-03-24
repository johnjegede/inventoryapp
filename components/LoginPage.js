import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet,View, TextInput, Image, Pressable} from 'react-native';
import { authenticate } from '../firebaseConfig';
import { AuthErrorCodes, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth'

// You can import supported modules from npm
// import { Card } from 'react-native-paper';


export default function LoginPage({navigation}) {
 const[email, onChangeEmail] =  useState('')
 const[password, onChangePassword] =  useState('')
 const auth = authenticate
 const[errormessage, setErrormessage] =  useState('')

//  useEffect(()=>{
//   const unsubscribe=  onAuthStateChanged(auth,(user)=>{
//     if(user){
//       const uid = user.uid;
//       console.log('user logged in')
//       navigation.navigate('Details')

//     }else {
//       console.log('user is signedout')
//     }
//   }) 
//   return unsubscribe
//  }, [])

 const signIn = async() =>{

  
     await signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log(user);
      onChangeEmail("")
      onChangePassword("")
      navigation.navigate('HomeScreen')

    })
    .catch((error)=>{
      const errorCode = error.code;

      if (
        error.code === AuthErrorCodes.INVALID_PASSWORD ){
          setErrormessage("Invalid password");
        }
        if (
          error.code === AuthErrorCodes.INVALID_EMAIL){
            setErrormessage("Invalid email");
          }
      //  console.log(error.message)
    })
  
 }

  return (
    <SafeAreaView style={pageStyle.container}>
    <View style={pageStyle.view}>
       <Image></Image>
    </View>
    <View style={pageStyle.view}>
      <Text style={pageStyle.text}> Login</Text>
      {errormessage != "" && (<Text style={pageStyle.errorTxt}> {errormessage}</Text>)}
      <TextInput 
      style={pageStyle.textInput}
      value={email}
      onChangeText={onChangeEmail}
      placeholder='Email'>
      </TextInput>
      <TextInput 
      style={pageStyle.textInput}
      value={password}
      onChangeText={onChangePassword}
      placeholder='Password'>
      </TextInput>

      <View style={pageStyle.viewReg} >
      <Text style={pageStyle.textOuter}> Don't have an account? 
      </Text>
      <Pressable style={pageStyle.pressInner} onPress={()=> navigation.navigate('Register')}>
      <Text style={pageStyle.textInner}> Register</Text>
      </Pressable>
      </View>

      <Pressable  style={pageStyle.pressable} onPress={()=> signIn()}> 
      <Text style={pageStyle.presstext}>Login</Text>
      </Pressable>

      <View style={pageStyle.viewReg} >
      <Text style={pageStyle.textOuter}> Go back to </Text>
      <Pressable style={pageStyle.pressInner} onPress={()=> navigation.navigate('Main')}>
      <Text style={pageStyle.textInner}>Main Page</Text>
      </Pressable>
      </View>
    </View>
      
    </SafeAreaView>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    // width: 450
  },
  view: {
    flex:0.5,
    marginHorizontal: 10,

  },
  text:{
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textInput:{
    borderWidth:2,
    marginHorizontal:10,
    marginVertical:20,
    borderRadius:8,
    height:50,
    padding: 10,
  },
  pressable:{
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical:11,
    marginHorizontal:40,
    marginVertical:20,
    backgroundColor:'#4980FF'
    
  },
  presstext:{
    textAlign:'center',
    fontSize: 20,
    fontWeight:'600',
    color:'white'
    
  },
  viewReg:{
    flexDirection: 'row',
    marginHorizontal:30

  },
  textOuter:{
    fontSize: 16,
  
  },
  pressInner:{
  
  },
  textInner:{
   fontSize: 16,
   fontWeight:'600'
   
  },
  errorTxt:{
    fontSize:14,
    color:"#FF0D10",
    fontWeight:"600",
    textAlign:"center"
  },

});
