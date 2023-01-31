import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import {firebase} from '../config'


const EditDocContact=({ navigation, route })=> {

   function deleteContact(contact) {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        'd_info': firebase.firestore.FieldValue.arrayRemove(contact)
      })
      .then(() => navigation.navigate('Doctors')) 
      .catch((error) => console.log(error));
   }

   function addContact() {

      firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        'd_info': firebase.firestore.FieldValue.arrayUnion(contactInfo)
      })
      .catch((error)=>{
         alert(error.message)
       })

       //in firestore fields with [{}, {}, {}] cant be updated so workaround
       deleteContact(route.params.editContact)

      

    }
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        setContactInfo(route.params.editContact) 
      
    }, [route.params.editContact])


   return (
      <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput 
               style={styles.input}
               //placeholder="Doctor's Name"
               value={contactInfo ? contactInfo.d_name:""}
               onChangeText={(text) => setContactInfo({...contactInfo, d_name:text})}
            />
            <TextInput 
               style={styles.input}
               //placeholder='Their medical expertise in (Specialist)'
               value={contactInfo ? contactInfo.specialist:''}
               onChangeText={(text) => setContactInfo({...contactInfo, specialist:text})}
            />

             <TextInput 
               style={styles.input}
               //placeholder='Timings'
               value={contactInfo ? contactInfo.timings:''}
               onChangeText={(text) => setContactInfo({...contactInfo, timings:text})}
               multiline = {true}
            />

            <TextInput 
               style={styles.input}
               //placeholder='Primary Contact Number '
               keyboardType='number-pad'
               value={contactInfo ? contactInfo.phoneNumber1:''}
               onChangeText={(text) => setContactInfo({...contactInfo, phoneNumber1:text})}
            />

            <TextInput 
               style={styles.input}
               //placeholder='Secondary Contact Number '
               keyboardType='number-pad'
               value={contactInfo ? contactInfo.phoneNumber2:''}
               onChangeText={(text) => setContactInfo({...contactInfo, phoneNumber2:text})}
            />
            <TextInput 
               style={styles.input}
               //placeholder = "Address"
               value={contactInfo ? contactInfo.address:''}
               onChangeText={(text) => setContactInfo({...contactInfo, address:text})}
               autoCorrect = {false}
               multiline = {true}
            />

            <TextInput
                      style={styles.input}
                      //placeholder = "Email"
                      value={contactInfo ? contactInfo.email:''}
                      onChangeText={(text) => setContactInfo({...contactInfo, email:text})}
                      autoCapitalize = "none"
                      autoCorrect = {false}
                      keyboardType='email-address'
            /> 
         </View>
         
         <TouchableOpacity 
            title='Save'
            onPress={() => {
               !contactInfo.d_name || !contactInfo.specialist || 
               !contactInfo.timings || !contactInfo.phoneNumber1 ||!contactInfo.address
               ? alert("Kindly check the input fields")
               : addContact()
            }}
            style= {styles.button}
         >
            <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>Edit the Details</Text>
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

export default EditDocContact