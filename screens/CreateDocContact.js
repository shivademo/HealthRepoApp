import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import {firebase} from '../config'
import urid from 'urid'

const CreateDocContact=({ navigation, route })=> {

   const [d_name, setD_name] = useState('');
   const [specialist, setSpecialist] = useState('');
   const [phoneNumber1, setPhoneNumber1] = useState('');
   const [phoneNumber2, setPhoneNumber2] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [timings, setTimings] = useState('');

   function addContact(d_name,specialist, timings, phoneNumber1, phoneNumber2,address, email ) {
      /* var docData = 
            {
                  'd_name' :d_Name,
                  'doctorId' :'d'+,
                  'specialist' :specialist,
                  'address' :"Fortis Hospital, Mulund, Mumbai",
                  'contact' :9090909090,
                  'timings' : '10am to 1pm Thursady Saturday'
               } */

      var docData = {
         d_name,
         specialist,
         timings,
         phoneNumber1,
         phoneNumber2,
         address,
         email, 
         doctorId : "d"+urid('alphanum')
      }         
      

      firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
         d_info: firebase.firestore.FieldValue.arrayUnion(docData)
      })
      .then(() => navigation.navigate('Doctors')) 
      .catch((error)=>{
         alert(error.message)
       })

    }

   return (
      <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput 
               style={styles.input}
               placeholder="Doctor's Name"
               value={d_name}
               onChangeText={(text) => setD_name(text)}
            />
            <TextInput 
               style={styles.input}
               placeholder='Their medical expertise in (Specialist)'
               value={specialist}
               onChangeText={(text) => setSpecialist(text)}
            />

            <TextInput 
               style={styles.input}
               placeholder='Timings'
               value={timings}
               onChangeText={(text) => setTimings(text)}
               multiline = {true}
            />

            <TextInput 
               style={styles.input}
               placeholder='Primary Contact Number '
               keyboardType='number-pad'
               value={phoneNumber1}
               onChangeText={(text) => setPhoneNumber1(text)}
            />

            <TextInput 
               style={styles.input}
               placeholder='Secondary Contact Number '
               keyboardType='number-pad'
               value={phoneNumber2}
               onChangeText={(text) => setPhoneNumber2(text)}
            />
            <TextInput 
               style={styles.input}
               placeholder = "Address"
               value={address}
               onChangeText={(address)=>setAddress(address)}
               autoCorrect = {false}
               multiline = {true}
            />

            <TextInput
                      style={styles.input}
                      placeholder = "Email"
                      value={email}
                      onChangeText={(email)=>setEmail(email)}
                      autoCapitalize = "none"
                      autoCorrect = {false}
                      keyboardType='email-address'
            />
         </View>
         
         <TouchableOpacity 
            title='Save'
            onPress={() => {
               !d_name || !specialist || !timings || !phoneNumber1 ||!address
               ? alert("Kindly check the input fields")
               : addContact(d_name, specialist, timings, phoneNumber1, phoneNumber2, address,email)
            }}
            style= {styles.button}
         >
            <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>Add the Details</Text>
         </TouchableOpacity> 
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
    },
    inputContainer: {
      padding: 10,
      margin: 10
    },
    input: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
      padding: 10
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
})

export default CreateDocContact