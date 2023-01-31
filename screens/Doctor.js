import React, { useState, useEffect } from "react";
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Touchable
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native';

import DoctorCard from '../components/DoctorCard';
import {firebase} from '../config'


const Doctor=(props)=>{
    const [name, setName] = useState('')
    const [myDoctors, setMyDoctors] = useState([]);
    const isFocused = useIsFocused();

  
    useEffect(()=>{
      
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot)=>{
        if(snapshot.exists){
          var info = snapshot.data()
          setName(info.firstName)
          console.log(info.d_info)
          setMyDoctors(info.d_info)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [isFocused])

    const categoriesData = [
      {
        displayText: "Want To Research About Human Brain ?",
        img: require("../assets/doctor_icon.png"),
        backgroundColor: "#ffbc7c",
        navigateTo: "Research",
      },
    
      {
        displayText: "Want To Test Your Skills ?",
        img: require("../assets/doctor_icon.png"),
        backgroundColor: "#badc58",
        navigateTo: "Quiz",
      },
    
      {
        displayText: "Want a healthy Brain ?",
        img: require("../assets/doctor_icon.png"),
        backgroundColor: "#ffeaa7",
        navigateTo: "Healthy Brain",
      },
    ];

    return (
       
         <View style={styles.container}>
          <View style={{flex:0.1}}>
          <Text style={styles.title}>
              Hello, {name} 
            </Text>
         <Ionicons 
            name='add-circle'
            size={55}
            color='#87c6ec'
            style={styles.addIcon}
            onPress={() => props.navigation.navigate('CreateDocContact')}
         />
         </View>
        <View style={{flex:0.8}}>
         <FlatList 
            data={myDoctors}
            keyExtractor={(item) => item.doctorId}
            renderItem={({ item }) => (
              
               <TouchableOpacity onPress={() => props.navigation.navigate('DoctorProfile', {
                  contactInfo: { d_data: item }
               })}>
                  <DoctorCard contactInfo={item} />
               </TouchableOpacity>
               
            )}
         />
         </View>
      </View>
       
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  addIcon: {
    top: 10,
    right: 20,
    position: 'absolute',
    //zIndex: 1,
  },
  title:{
    fontSize:16,
    color:"green", 
    margin:20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 1
  }
});


export default Doctor;
