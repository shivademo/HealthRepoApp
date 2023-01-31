import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from "../components/Header";
import Doctor from "../screens/Doctor";
import CreateDocContact from "../screens/CreateDocContact";
import DoctorProfile from "../screens/DoctorProfile";
import EditDocContact from "../screens/EditDocContact";

const D_stack = createStackNavigator();

const DocNav=()=>{

    return (
        <D_stack.Navigator initialRouteName='Doctors'>
                        <D_stack.Screen name="Doctors" 
                                        component={Doctor}
                                        options = {{
                                            headerTitle: ()=> <Header name="Doctors" />,
                                            headerStyle: {
                                            height:120,
                                            borderBottomLeftRadius:50,
                                            borderBottomRightRadius:50,
                                            backgroundColor:"#439639",
                                            shadowColor:"#000",
                                            elevation:30,
                                            
                                            },
                                        }} 
                        />
                        <D_stack.Screen 
                                        name='CreateDocContact' 
                                        component={CreateDocContact} 
                                        options = {{
                                            headerTitle: ()=> <Header name="Enter Details" />,
                                            headerStyle: {
                                                height:120,
                                                borderBottomLeftRadius:50,
                                                borderBottomRightRadius:50,
                                                backgroundColor:"#439639",
                                                shadowColor:"#000",
                                                elevation:30,
                                                
                                            },
                                        }} 
                        />
                        <D_stack.Screen 
                                    name='DoctorProfile' 
                                    component={DoctorProfile}
                                    options = {{
                                        headerTitle: ()=> <Header name="Doctor Profile" />,
                                        headerStyle: {
                                        height:120,
                                        borderBottomLeftRadius:50,
                                        borderBottomRightRadius:50,
                                        backgroundColor:"#439639",
                                        shadowColor:"#000",
                                        elevation:30,
                                        
                                        },
                                    }}
                        />
                        <D_stack.Screen 
                                    name='EditDocContact' 
                                    component={EditDocContact}
                                    options = {{
                                        headerTitle: ()=> <Header name="Edit Doctor Profile" />,
                                        headerStyle: {
                                        height:120,
                                        borderBottomLeftRadius:50,
                                        borderBottomRightRadius:50,
                                        backgroundColor:"#439639",
                                        shadowColor:"#000",
                                        elevation:30,
                                        
                                        },
                                    }}
                        />
        </D_stack.Navigator>
    )

}

export default DocNav