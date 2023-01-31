import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import {firebase} from '../config'


const ForgotPassword=()=>{
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    
    
    const forgotPassword = (email)=>{
    
        firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            Alert.alert('Email Sent', 'Check the email to reset the password', [
                {text: 'Ok', onPress: () => {
                    navigation.navigate('Login')
                }},
              ]);
        })
        
        .catch ((error)=> {
            Alert.alert('Alert', "Enter the correct email to proceed", [
                {text: 'Ok'} ]);
        })
    }

    return (
      <View style={styles.container}>
        
        <MaterialIcons name='vpn-key' size={30} color='#1c9fa3' style={{alignSelf:"center", margin:20}}/>
        <Text style={{fontSize:15, alignSelf:"center", color:"#87c6ec",textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: -0.5, height: 0.5 },
              textShadowRadius: 1}}>
          Provide email to send the password
        </Text>
        <View style={{marginTop:35}}>
        <View style={{flexDirection:"row", borderWidth:0.5, borderRadius:10, margin:10, borderColor:"#D3D3D3"}}>
        <MaterialIcons name='email' size={18} color='#1c9fa3' style={{marginLeft:10, marginTop:25, marginRight:15}}/>
          <TextInput
            style={styles.textInput}
            placeholder = "Email"
            onChangeText={(email)=>setEmail(email)}
            autoCapitalize = "none"
            autoCorrect = {false}
          />
          </View>
          
        </View>
        
        <TouchableOpacity
          onPress={()=>forgotPassword(email)}
          style= {styles.button}
        >
          <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>Submit</Text>
        </TouchableOpacity>
        

       
       
      </View>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    marginTop:30,
    marginBottom:230,
    marginLeft:25,
    marginRight:25,
    borderRadius:20,
    borderColor:"#D3D3D3",
    backgroundColor:"#fffbfb",
    
    
  },
  textInput:{
    paddingTop:20,
    paddingBottom:10,
    width:250,
    fontSize:18,
    //borderBottomWidth:0.5,
    //borderBottomColor:"#000",
    marginBottom:10,
    alignSelf:"center",
    color:"#114901"
  },
  button:{
    marginTop:45,
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

export default ForgotPassword;
