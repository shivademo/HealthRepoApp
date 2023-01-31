import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert, Image} from 'react-native';
import {firebase} from '../config'


const Registration=()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [phoneNumber1, setPhoneNumber1] = useState(0)
    const [userImg, setUserImg] = useState('#')
    const [address, setAddress] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')


    const registerUser = async(firstName, lastName, email, password, confirmPassword)=>{
      if (password !== confirmPassword) {
        Alert.alert("Password doesn't match", "Please check your password", [
          {text: 'Ok'},
        ]);
      }else{
          await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(()=>{
              firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://healthrepo-de4a9.firebaseapp.com'
              })
              .then(()=>{
                Alert.alert('Email Sent', "Verification email sent", [
                  {text: 'Ok'},
                ]);
              })
              .catch((error)=>{
                alert(error.message)
              })
              .then(()=>{
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                  firstName,
                  lastName,
                  email,
                  age,
                  phoneNumber1,
                  address,
                  userImg,
                  bloodGroup
                  
                })
                
              })
              .catch((error)=>{
                alert(error.message)
              })
          })
          .catch((error)=>{
            alert(error.message)
          })
      }
      
}

    return (
          <View
            style={styles.container}
          >
             
                <Text style={{
                  fontSize:20,color:"green",
                  margin:20,paddingLeft:20,
                  textShadowColor: 'rgba(0, 0, 0, 0.5)',
                  textShadowOffset: { width: -0.5, height: 0.5 },
                  textShadowRadius: 1}}
                >
                  Register Here !!
                </Text>
                <View>
                  <TextInput
                      style={styles.textInput}
                      placeholder = "First Name"
                      onChangeText={(firstName)=>setFirstName(firstName)}
                      autoCorrect = {false}
                      
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder = "Last Name"
                      onChangeText={(lastName)=>setLastName(lastName)}
                      autoCorrect = {false}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder = "Email"
                      onChangeText={(email)=>setEmail(email)}
                      autoCapitalize = "none"
                      autoCorrect = {false}
                      keyboardType='email-address'
                    />
                    
                    <TextInput
                      style={styles.textInput}
                      placeholder = "Password"
                      onChangeText={(password)=>setPassword(password)}
                      autoCapitalize = "none"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder = "Confirm Password"
                      onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}
                      autoCapitalize = "none"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                    />
                </View>
                <TouchableOpacity
                  onPress={()=>
                    {
                      !email || !password || !confirmPassword || !firstName ||!lastName
                      ? (
                        Alert.alert("Kindly check the input fields", "All are mandatory", [
                          {text: 'Ok'},
                        ])
                      )
                      : registerUser(firstName, lastName, email, password, confirmPassword)}
                    }
                      style= {styles.button}
                >
                  <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>REGISTER</Text>
                </TouchableOpacity>
                <Image source={require("../assets/wave.png")} 
                  style={{
                    width:400, 
                    height:150,
                    marginTop:70,
                    alignSelf:"center"           
                  }}
                />
              
          </View>
          
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    marginTop:30,
    marginBottom:200,
    marginLeft:25,
    marginRight:25,
    borderRadius:20,
    borderColor:"#D3D3D3",
    backgroundColor:"#fffbfb"
  },
  textInput:{
    paddingTop:20,
    paddingBottom:8,
    width:250,
    fontSize:16,
    borderBottomWidth:0.5,
    borderBottomColor:"#000",
    alignSelf:"center",
    color:"#114901"
  },
  button:{
    marginTop:30,
    height:50,
    width:250,
    backgroundColor:"#1c9fa3",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    alignSelf:"center",
    shadowColor:"#335e90",
    elevation:25,
    borderWidth:0.5,
    borderColor:"#fff",
  }
});

export default Registration;
