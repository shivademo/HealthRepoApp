import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountNav from "./AccountNav";
import ScreenStackNavigation from "./ScreenStackNavigation";

const Tab = createMaterialBottomTabNavigator();

const TabNavigation=()=>{
    

    return (
        <Tab.Navigator
            activeColor="#0057e7"
            inactiveColor="#aaa"
            barStyle={{ 
                height:"10%", 
                overflow:"hidden",
                position:"absolute",
                backgroundColor:"#e8f4ea"
            }} 
        >
            <Tab.Screen 
                name="ScreenStack" 
                component={ScreenStackNavigation} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={"#335e90"} size={25} />
                    ),
                    
                    
                }}
            />
            <Tab.Screen 
                name="AccountNav" 
                component={AccountNav} 
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account" color={"#335e90"} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
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


export default TabNavigation;
