import React, { useState, useEffect } from 'react'
import { 
   View, 
   Text,
   StyleSheet,
   Dimensions,
   ActivityIndicator,
   Image,
   TouchableOpacity
} from 'react-native';
import {firebase} from '../config'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { useFocusEffect,useIsFocused } from '@react-navigation/native';



export default function Settings({navigation, route}) {

   const [profileData, setProfileData] = useState(null);
   const [profileImg, setProfileImg] = useState(null);
   const isFocused = useIsFocused();
   useEffect(() => {
        
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot)=>{
        if(snapshot.exists){
          setProfileData(snapshot.data())
          
        }
        else{
            console.log('User does not exist')
        }
        })
        
   }, [isFocused])

   
   if(!profileData) {
      return <ActivityIndicator size={32} />
   }
   
   return (
      <View style={styles.container}>
            <View style={styles.backgroundImage}>
            <Image
              style={styles.userImg}
              source={{uri: profileData.userImg !='#'  ? profileData.userImg:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
            />
            <Text style={styles.userName}>{profileData.firstName } {profileData.lastName }</Text>
            <Text style={{ fontSize: 16, margin: 5, paddingBottom:8,fontWeight:"bold", borderBottomWidth:1, color:"#335e90" }}>{profileData.email}</Text>
                <Text style={{ fontSize: 16,margin: 5}}>{profileData.address}</Text>
                <Text style={{ fontSize: 16,margin: 5 }}>Age: {profileData.age == 0? "":profileData.age}</Text>
                <Text style={{ fontSize: 16,margin: 5 }}>Blood Group: {profileData.bloodGroup}</Text>
                <Text style={{ fontSize: 16,margin: 5}}>Contact: {profileData.phoneNumber1==0?"":profileData.phoneNumber1}</Text>
                <AntDesign 
                          name='edit' 
                          size={28} 
                          color='green'
                          style = {{position:"absolute", right:20, bottom:40}}
                          onPress={() => {
                            navigation.navigate("EditProfile")
                            //setProfileData(null)
                          }} 
                    />

            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
              //firebase.auth().signOut()
              navigation.navigate("Dashboard");
              firebase.auth().signOut()
            }}>
            
              <Text style={{ fontSize: 16, marginLeft: 10 , color:"#041562", marginRight:10}}>Logout</Text>
              <MaterialIcons name='logout' size={20} color='#041562' 
                                  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {navigation.navigate("ContactUs")}}>
            
              <Text style={{ fontSize: 16, marginLeft: 10 , color:"#041562", marginRight:10}}>Help Center and Contact Us</Text>
              <MaterialIcons name='help' size={20} color='#041562' 
                                   />
            </TouchableOpacity>  
            
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   backgroundImage: {
     width: Dimensions.get('screen').width,
     height: Dimensions.get('screen').height/2,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor:"#FAF1E6",
     marginTop:20
   },
   mainText:{
     position: 'absolute',
     bottom: 20,
     left: 20,
     fontSize: 30,
     color: 'white',
     fontWeight: 'bold'
   },
   title:{
    fontSize:16,
    color:"green", 
    margin:20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 1
  },
  buttonContainer: {
     //flex: 1,
     marginHorizontal: 10,
     marginBottom: 20,
     paddingHorizontal: 10,
     elevation: 2,
     paddingVertical: 20,
     backgroundColor: 'white',
     flexDirection: 'row',
   },
   userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color:"#387C6D"
  },
  userBtn: {
    //borderColor: '#D3D3D3',
    //borderWidth: 0.5,
    //borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    elevation:1
  },
  userBtnTxt: {
    color: '#2e64e5',
    fontWeight:"bold"
  },
 })