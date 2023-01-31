import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import {firebase} from '../config'


const Login=()=>{
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    loginUser = async(email, password)=>{
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        navigation.navigate('Tabs')
      } catch (error) {
        Alert.alert('Please check the credentials', error.message, [
          {text: 'Ok'},
        ]);
      }
    }
    

    return (
      <View style={styles.container}>
        
        <Text style={{fontSize:22,color:"green", marginTop:20, paddingLeft:30,textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: -0.5, height: 0.5 },
              textShadowRadius: 1}}>
          Welcome User
        </Text>
        <Text style={{fontSize:15, marginTop:10, paddingLeft:30, color:"#87c6ec",textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: -0.5, height: 0.5 },
              textShadowRadius: 1}}>
          Sign in to continue
        </Text>
        <View style={{marginTop:25}}>
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
          <View style={{flexDirection:"row", borderWidth:0.5, borderRadius:10, margin:10, borderColor:"#D3D3D3"}}>
        <MaterialIcons name='lock' size={18} color='#1c9fa3' style={{marginLeft:10, marginTop:25, marginRight:15}}/>
          <TextInput
            style={styles.textInput}
            placeholder = "Password"
            onChangeText={(password)=>setPassword(password)}
            autoCapitalize = "none"
            autoCorrect = {false}
            secureTextEntry = {true}
          />
          </View>
        </View>
        <TouchableOpacity
          onPress={()=>navigation.navigate("ForgotPassword")}
          style= {{marginLeft:20}}
        >
          <Text style={{fontSize:12, fontWeight:"bold", color:"#999"}}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>loginUser(email, password)}
          style= {styles.button}
        >
          <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>navigation.navigate("Registration")}
          style= {{marginTop:15, alignSelf:"center"}}
        >
          <Text style={{fontSize:14, fontWeight:"bold", color:"#1e3932"}}>Don't have the account? Register Now</Text>
        </TouchableOpacity>

        <Image source={require("../assets/wave.png")} 
            style={{
              width:400, 
              height:150,
              marginTop:70,
              alignSelf:"center"           
            }}/>
       
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
    backgroundColor:"#fffbfb"
    
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
    marginTop:35,
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

export default Login;
