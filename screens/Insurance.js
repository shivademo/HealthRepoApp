import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import {firebase} from '../config'


const Insurance=()=>{
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
              Hello, {name.firstName} {name.lastName} in Insurance
            </Text>
            <Text style={{fontSize:16, fontWeight:"bold", textAlign:"center", marginTop:20}}>
              Page Coming Soon
            </Text>
            <TouchableOpacity
                onPress={()=>{firebase.auth().signOut()}}
                style= {styles.button}
            >
                <Text style={{fontSize:20, fontWeight:"bold", color:"#fff"}}>Sign out</Text>
            </TouchableOpacity>
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


export default Insurance;
