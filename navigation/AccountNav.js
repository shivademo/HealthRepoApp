import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings'
import Header from "../components/Header";
import ContactUs from "../screens/ContactUs";
import EditProfile from "../screens/EditProfile";

const A_stack = createStackNavigator();

const AccountNav=()=>{

    return (
        <A_stack.Navigator initialRouteName='Settings'>
                        <A_stack.Screen name="Settings" 
                                        component={Settings}
                                        options = {{
                                            headerTitle: ()=> <Header name="Health Repo" />,
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
                        <A_stack.Screen 
                                    name='EditProfile' 
                                    component={EditProfile}
                                    options = {{
                                        headerTitle: ()=> <Header name="Edit Your Profile" />,
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
                         <A_stack.Screen 
                                    name='ContactUs' 
                                    component={ContactUs}
                                    options = {{
                                        headerTitle: ()=> <Header name="Help" />,
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
        </A_stack.Navigator>
    )

}

export default AccountNav