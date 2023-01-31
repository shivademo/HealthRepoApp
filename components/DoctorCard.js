import React from 'react'
import { View, StyleSheet, Text,Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getColorByLetter } from '../medi_data/profileColor';

export default function DoctorCard({ contactInfo }) {
   
   //const displayName = contactInfo.d_name;
   //const specialist  = contactInfo.specialist;
   console.log(contactInfo)
   const color = getColorByLetter(contactInfo.d_name[0]);
   return (
      <View style={styles.card}>

         <View style={styles.infoContainer}>
            <View style={{...styles.icon, backgroundColor: color}}>
               <Text style={styles.iconContent}>{contactInfo.d_name[0]}</Text>
            </View>
            <Text style={{fontSize:16, fontWeight:"bold", color:"#335e90"}}>{contactInfo.d_name}</Text>
            
         </View>
         <Text style={styles.subtitle}>{contactInfo.specialist}</Text>
         <Image source={require("../assets/right_arrow.png")} 
                style={{
                width:15, 
                height:15,   
                position:"absolute",
                right:20,
                top:35    
                }}/>  
         
      </View>
   )
}

const styles = StyleSheet.create({
   card: {
      padding: 10,
      margin: 5,
      borderBottomWidth:1,
      borderColor:"#D3D3D3"
   },
   infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      //paddingVertical: 2,
      
   },
   subtitle: {
      fontSize: 14,
      left:50,
      color:"#335e90",
      fontStyle:"italic"
    
   },
   iconContent: {
      flex: 1,
      paddingVertical: 5,
      fontSize: 20,
      color: 'white',
      marginHorizontal: 10
   },
   icon:{
      borderRadius: 25,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      padding: 1,
      backgroundColor: 'green'
   }
})