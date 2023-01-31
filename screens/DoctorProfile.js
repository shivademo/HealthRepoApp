import React, { useState, useEffect } from 'react'
import { 
   View, 
   Text,
   StyleSheet,
 
   Dimensions,
   StatusBar,
   
   ActivityIndicator,
   Linking,
   Alert
} from 'react-native';
import {firebase} from '../config'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 



export default function DoctorProfile({navigation, route}) {

   const [contactInfo, setContactInfo] = useState(null);

   useEffect(() => {
        setContactInfo(route.params.contactInfo.d_data)
   }, [route.params.contactInfo.d_data])

  
   function makeCall(phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`)
   }

   function deleteContact(contact) {
    Alert.alert('Delete', 'Are you sure to delete the contact', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
          'd_info': firebase.firestore.FieldValue.arrayRemove(contact)
        })
        .then(() => navigation.navigate('Doctors')) 
        .catch((error) => console.log(error));
      }},
    ]);
    
   }

   
   if(!contactInfo) {
      return <ActivityIndicator size={32} />
   }

   return (
      <View style={styles.container}>
            <View style={styles.backgroundImage}>
                
                <AntDesign
                onPress={() => deleteContact(contactInfo)} 
                name='delete' size={25} color='#fff'
                style={{ position: 'absolute', top: StatusBar.currentHeight, right: 20 }}
                />
                <AntDesign 
                          name='edit' 
                          size={25} 
                          color='#fff'
                          style = {{position:"absolute", right:20, bottom:20}}
                          onPress={() => navigation.navigate("EditDocContact",{"editContact":contactInfo})} 
                    />
                <Text style={styles.mainText}>{contactInfo.d_name}</Text>

            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, margin: 10, paddingBottom:10,fontWeight:"bold", borderBottomWidth:1, color:"#335e90" }}>{contactInfo.specialist}</Text>
                <Text style={{ fontSize: 17, marginLeft: 10 }}>{contactInfo.address}</Text>
                <Text style={{ fontSize: 16, marginLeft: 10 }}>{contactInfo.email}</Text>
                <Text style={{ fontSize: 16, margin: 10,  }}>{contactInfo.timings}</Text>
                    <View style={styles.phonenNumberContainer}>     
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>{contactInfo.phoneNumber1}</Text>
                        <MaterialIcons name='phone' size={28} color='green'
                                onPress={() => makeCall(contactInfo.phoneNumber1)} />
                    </View>
                    <View style={styles.phonenNumberContainer}>     
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>{contactInfo.phoneNumber2}</Text>
                        <MaterialIcons name='phone' size={28} color='green'
                                onPress={() => makeCall(contactInfo.phoneNumber2)} />
                    </View>
                    

            </View>
            
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   backgroundImage: {
     marginTop:20,
     width: Dimensions.get('screen').width,
     height: Dimensions.get('screen').height/5,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor:"coral"
   },
   mainText:{
     position: 'absolute',
     bottom: 20,
     left: 20,
     fontSize: 30,
     color: 'white',
     fontWeight: 'bold'
   },
   phonenNumberContainer: {
     //flex: 1,
     marginHorizontal: 10,
     marginBottom: 20,
     paddingHorizontal: 10,
     elevation: 5,
     paddingVertical: 20,
     backgroundColor: 'white',
     flexDirection: 'row',
     justifyContent: 'space-between'
   }
 })