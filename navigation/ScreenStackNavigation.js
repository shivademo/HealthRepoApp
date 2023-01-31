import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocNav from "./DocNav";

import Header from "../components/Header";
import Dashboard from "../screens/Dashboard";
import Routine from "../screens/Routine";
import Prescription from "../screens/Prescription";
import Allergy from "../screens/Allergy";
import Immunization from "../screens/Immunization";
import Insurance from "../screens/Insurance";


const ScreenStack = createStackNavigator();

const ScreenStackNavigation=()=>{
    

    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen 
                name="Dashboard" 
                component={Dashboard}
                options = {{
                    headerTitle: ()=> <Header name="Health Repo" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
            <ScreenStack.Screen
                name="DocNav"
                component={DocNav}
                options={{
                  headerShown:false
                }}
            />
            <ScreenStack.Screen 
                name="Routine" 
                component={Routine}
                options = {{
                    headerTitle: ()=> <Header name="Medication" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
            <ScreenStack.Screen 
                name="Prescription" 
                component={Prescription}
                options = {{
                    headerTitle: ()=> <Header name="Prescriptions" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
            <ScreenStack.Screen 
                name="Allergy" 
                component={Allergy}
                options = {{
                    headerTitle: ()=> <Header name="Allergies" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
            <ScreenStack.Screen 
                name="Immunization" 
                component={Immunization}
                options = {{
                    headerTitle: ()=> <Header name="Immunization" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
            <ScreenStack.Screen 
                name="Insurance" 
                component={Insurance}
                options = {{
                    headerTitle: ()=> <Header name="Insurance" />,
                    headerStyle: {
                      height:80,
                      borderBottomLeftRadius:50,
                      borderBottomRightRadius:50,
                      backgroundColor:"#439639",
                      shadowColor:"#000",
                      elevation:30,
                      
                    },
                }}
            />
        </ScreenStack.Navigator>
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


export default ScreenStackNavigation;
