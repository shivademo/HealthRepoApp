import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Linking } from 'react-native';
import MailIcon from "react-native-vector-icons/Entypo";
import {firebase} from '../config'


const ContactUs=()=>{
    const [name, setName] = useState('')

    useEffect(()=>{
      
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot)=>{
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:20, fontWeight:"bold"}}>
              Hello, {name.firstName} {name.lastName} 
            </Text>
            <View style={{padding:10, borderWidth:0.5, margin:20, borderRadius:10, }}>
            <Text style={{fontSize:18, fontWeight:"bold", margin:10, color:"#666699"}}>
              Write to us, will get back to you.
            </Text>
            <TouchableOpacity
                onPress={() => {
                  Linking.openURL("mailto:shiva.smile.rohatgi@gmail.com");
                  
                }}
                style={{ borderRadius: 50 / 2, alignSelf:"center" }}
              >
                <MailIcon name="mail" color="blue" size={30} />
              </TouchableOpacity>
              </View>
            <Image source={require("../assets/wave.png")} 
            style={{
              width:400, 
              height:150,
              marginTop:70,
              alignSelf:"center"           
            }}/>
       
        </SafeAreaView>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop:50,
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


export default ContactUs;
