import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryCard=(props)=> {
   
   return (
            
         <View style={styles.card}>
            <View style={styles.infoContainer}>
                
                <Image source={props.categoryInfo.c_icon} 
                style={{
                width:30, 
                height:30,            
                }}/>
                
                <Text style={styles.primaryText}>{props.categoryInfo.c_name}</Text>
            </View>
                
                <Image source={require("../assets/right_arrow.png")} 
                style={{
                width:15, 
                height:15,   
                position:"absolute",
                right:10,
                top:15     
                }}/>            
       
        </View>      
   )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 8,
        borderWidth:1,
        borderRadius:10,
        borderColor:"#D3D3D3",
        flexDirection: 'row',
        
     },
     infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       
     },
     primaryText: {
        fontSize: 16,
        marginLeft:10
     },
     iconContent: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 22,
        color: 'white',
        marginHorizontal: 20
     },
     
})

export default CategoryCard;