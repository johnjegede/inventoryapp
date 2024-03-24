import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, StatusBar, View, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import { authenticate, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';



const SignupSchema= Yup.object().shape({
  name: Yup.string()
  .min(2,"Too Short!")
  .max(50, "Too Long!")
  .required("Please enter your full name."),
  email: Yup.string()
  .email('Invalid email').required('Required'),
  password: Yup.string()
  .min(8)
  .required("Please enter your password.")
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, 
    "Must contain minimum 8 characters, at least one uppercase letter"
  ),
  confirmPassword: Yup.string()
  .min(8, "Confirm password must be 8 characters long.")
  .oneOf([Yup.ref('password')],"Your Passwords do not match.")
  .required("Confirm password is required"),
  mobile:Yup.string()
  .min(10, 'Must be exactly 10 digits')
  .max(10, "Must be exactly 10 digits")
  .matches(/^[0-9]+$/, "Must be only digits")
  .required("Please enter your mobile number")

})


export default function Register({ navigation }) {

    const auth = authenticate;
    const signUp = async (values) => {
        // console.log(values)
        await createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            // console.log(user.uid);
            await setDoc(doc(db, "users", user.uid), {
              fullname: values.name,
              email: values.email,
              password: values.password,
              phonenumber: "",
              dob: "",
              availability: [],
              schedule: [],
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.Message;
    
            console.log(errorMessage);
          });
    
        navigation.navigate("LoginPage");
      };

  return (
    <Formik initialValues={
      {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => console.log("Values are",values)}
    //   signUp(values)
      >
    {({values,errors,touched,handleChange,handleBlur, setFieldTouched, isValid, handleSubmit}) => (
        
    <View style={pageStyle.wrapper}>
      <StatusBar barStyle={"light-content"}></StatusBar>
      <View style={pageStyle.formContainer}>
      <Text style={pageStyle.title}>Register</Text>
      <Text style={pageStyle.textDetails}>
        Please enter your details to register
      </Text>
      <Text>{isValid}</Text>

      <View style={pageStyle.inputWrapper}> 
      <Text style={pageStyle.errorVal}>Name </Text>
      <TextInput style= {pageStyle.inputStyle} placeholder="Enter first name and last name" value={values.name} 
      autoCapitalize="none"
      onChangeText={ handleChange('name')}
      onBlur={()=> setFieldTouched('name')}/>
      {touched.name && errors.name && (<Text style={pageStyle.errorTxt}> {errors.name}</Text>)}
      </View>

      <View style={pageStyle.inputWrapper}> 
      <Text style={pageStyle.errorVal}>Email </Text>
      <TextInput style= {pageStyle.inputStyle} placeholder="Email Address" value={values.email} 
      autoCapitalize="none"
      onChangeText={ handleChange('email')}
      onBlur={()=> setFieldTouched('email')}/>
      {touched.email && errors.email && (<Text style={pageStyle.errorTxt}> {errors.email}</Text>)}
      </View>

      <View style={pageStyle.inputWrapper}> 
      <Text style={pageStyle.errorVal}>Password </Text>
      <TextInput style= {pageStyle.inputStyle} placeholder="Password" value={values.password} 
      autoCapitalize="none"
      onChangeText={ handleChange('password')}
      onBlur={()=> setFieldTouched('password')}/>
      {touched.password && errors.password && (<Text style={pageStyle.errorTxt}> {errors.password}</Text>)}
      </View>

      <View style={pageStyle.inputWrapper}> 
      <Text style={pageStyle.errorVal}>Confirm Password </Text>
      <TextInput style= {pageStyle.inputStyle} placeholder="Confirm Password" value={values.confirmPassword} 
      autoCapitalize="none"
      onChangeText={ handleChange('confirmPassword')}
      onBlur={()=> setFieldTouched('confirmPassword')}/>
      {touched.confirmPassword && errors.confirmPassword && (<Text style={pageStyle.errorTxt}> {errors.confirmPassword}</Text>)}
      </View>


      <TouchableOpacity onPress={()=> signUp(values)} style={[pageStyle.submitBtn, {backgroundColor: isValid ? '#4980FF' :"#A5C9CA"}]} disabled={isValid}>
      <Text style= {pageStyle.submitBtnTxt}> Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
    )}
    </Formik>
  );
}

const pageStyle = StyleSheet.create({

  wrapper:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    // backgroundColor:'#2C3333',
    paddingHorizontal:15,
  },
  formContainer:{
    backgroundColor:"#F5Eddc",
    padding: 20,
    borderRadius:20,
    width:'100%',
  },
  title:{
    color:'#16213E',
    fontSize:26,
    fontWeight:'400',
    marginBottom:15,
  },
  inputWrapper:{
    marginBottom:15,
  },
  inputStyle:{
    borderColor:"#16213E",
    borderWidth: 1,
    borderRadius:10,
    padding:10,
  },
  errorTxt:{
    fontSize:12,
    color:"#FF0D10",
  },
   errorVal:{
    fontSize:16,
    color:"black",
  },
  submitBtn:{
    // backgroundColor:"#395B64",
    padding:10,
    borderRadius:15,
    justifyContent: 'center',
  },
  submitBtnTxt:{
    color: '#fff',
    textAlign:'center',
    fontSize:18,
    fontWeight:'700',
  },
  textDetails: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10
  },
});
