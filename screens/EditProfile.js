import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {firebase} from '../config'

import { MaterialIcons } from '@expo/vector-icons';


const EditProfile=({ navigation, route })=> {


   const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
     
    const source = {uri:result.assets[0].uri}
    console.log(source);
    
    setImage(source);
    


  }

 

    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    //const [transferred, setTransferred] = useState(0);
    //const [selected, setSelected] = useState("");

   /*  const data = [
      {key:'1', value:'A+ve'},
      {key:'2', value:'A-ve'},
      {key:'3', value:'B+ve'},
      {key:'4', value:'B-ve'},
      {key:'5', value:'O+ve'},
      {key:'6', value:'O-ve'},
      {key:'7', value:'AB+'},
      {key:'8', value:'AB-'},
  ] */

    useEffect(() => {
         var db = firebase.firestore()
         .collection('users')
         .doc(firebase.auth().currentUser.uid)
         try {
            db.get()
          .then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
              setUserData(documentSnapshot.data());
              //console.log(userData)
            }
            else{
              console.log('User does not exist')
              }
          }).catch((e)=>console.log(e.message))
         } catch (error) {
          console.log(error.message);
         }
         
      }, [])
   
   const handleUpdate = async() => {
         let imgUrl = await uploadImage();
         console.log("imgurl..."+imgUrl)
     
         if( imgUrl == null && userData.userImg ) {
           imgUrl = userData.userImg;
         }
         console.log(imgUrl)
         const dbRef = firebase.firestore()
         .collection('users')
         .doc(firebase.auth().currentUser.uid)

         try {
            await dbRef
            .update({
              firstName: userData.firstName,
              lastName: userData.lastName,
              address: userData.address,
              phoneNumber1: userData.phoneNumber1,
              bloodGroup:userData.bloodGroup,
              age: userData.age,
              userImg: imgUrl,
              email: userData.email
            })
            .then(() => {
              console.log('User Updated!');
              Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.'
              );
              navigation.navigate("Settings")
            })
         } catch (error) {
          console.log(error.message)
         }
         
   }

   const uploadImage = async () => {

        
          setUploading(true)
          if(image){
            const response = await fetch(image.uri)
            console.log("response...."+response)
            const blob = await response.blob()
            const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
            console.log(filename)
            const ref =  firebase.storage().ref().child(userData.email).child(filename).put(blob)
            const storageRef = firebase.storage().ref(userData.email+'/'+filename)
            try {
              await ref
              const url = await storageRef.getDownloadURL()
              setUploading(false)
              Alert.alert("Photo uploaded")
              setImage(null)
              return url 
            } catch (error) {
              console.log(error.message)
              return null 
            }
          }else{
            
            return null
          }
          
      
    };
     

    if(!userData) {
      return <ActivityIndicator size={32} />
   }
   
   return (
    
      <View style={styles.container}>
          <View style={styles.inputContainer}>
          <Image 
           source={{ uri: image ? image.uri : userData.userImg == "#" ? 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : userData.userImg  }} 
 
            style={{ width: 100, height: 100, alignSelf:"center", borderRadius:50 }} /> 
            
            
            <MaterialIcons name='camera-alt'
               style={{alignSelf:"center", marginTop:5}}
               size={28}
               color="green"
               onPress={pickImage}
            />
             <View style={{alignItems: 'center'}}> 
               <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
               
            
            <TextInput 
               style={styles.input}
               value={userData ? userData.firstName:""}
               onChangeText={(text) => setUserData({...userData, firstName:text})}
            />
            <TextInput 
               style={styles.input}
               value={userData ? userData.lastName:''}
               onChangeText={(text) => setUserData({...userData, lastName:text})}
            />

             <TextInput 
               style={styles.input}
               placeholder='Enter Age'
               value={userData ? userData.age:0}
               onChangeText={(text) => setUserData({...userData, age:text})}
               keyboardType='number-pad'
            />

           {/*  <SelectList 
               placeholder='Enter Blood Group'
               setSelected={(val) => setUserData({...userData, bloodGroup:val})} 
               data={data} 
               boxStyles={{borderWidth:0.5, borderRadius:0}}
               search={false}
               save="value"
            /> */}
             <TextInput 
               style={styles.input}
               placeholder='Enter Blood Group'
               value={userData ? userData.bloodGroup:''}
               onChangeText={(text) => setUserData({...userData, bloodGroup:text})}
            /> 

            <TextInput 
               style={styles.input}
               placeholder='Enter Primary Contact Number'
               keyboardType='number-pad'
               value={userData ? userData.phoneNumber1:0}
               onChangeText={(text) => setUserData({...userData, phoneNumber1:text})}
            />

            <TextInput 
               style={styles.input}
               placeholder = "Address"
               value={userData ? userData.address:''}
               onChangeText={(text) => setUserData({...userData, address:text})}
               autoCorrect = {false}
               multiline = {true}
            />
         </View>
         
         <TouchableOpacity 
            title='Save'
            onPress={() => {
               !userData.firstName || !userData.lastName
               ? alert("Kindly check the input fields")
               : handleUpdate()
            }}
            style= {styles.button}
         >
            <Text style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>Update Profile</Text>
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
      marginTop:25,
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
    },
    panelTitle: {
      fontSize: 22,
      height: 30,
    },
    panelSubtitle: {
      fontSize: 12,
      color: 'gray',
      //height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#ECB390',
      alignItems: 'center',
      marginVertical: 7,
      width:"70%",
      alignSelf:"center"
    },
    panelButtonTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
    },
})

export default EditProfile