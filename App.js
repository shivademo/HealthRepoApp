import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {firebase} from './config'

import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Header from "./components/Header";
import TabNavigation from "./navigation/TabNavigation";


import ForgotPassword from "./screens/ForgotPassword";

const Stack = createStackNavigator()

function App(){

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChanged(user){
      setUser(user);
      if(initializing){
        setInitializing(false);
      }
    }

    useEffect(()=>{
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    if(initializing){
      return null;
    }

    if(!user){
      return (
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login}
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
          <Stack.Screen 
            name="Registration" 
            component={Registration}
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
          <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPassword}
            options = {{
              headerTitle: ()=> <Header name="Reset Password" />,
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
        </Stack.Navigator>
      )
    }

    else{  
      return (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen 
              name="Tabs" 
              component={TabNavigation}
              
            />
        </Stack.Navigator>
      );
    }
      
  
}


export default ()=>{
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

