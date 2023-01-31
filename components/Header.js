import React, { Component } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';


const Header=(props)=>{

    return (
        <View style={{ flexDirection:"row", flexWrap:"wrap"}}>
          <StatusBar backgroundColor="#439639" barStyle="light-content"></StatusBar>
          <Image source={require("../assets/logo2.png")} 
            style={{
              width:40, 
              height:40,            
            }}/>
            <Text style={{
              //fontWeight:"bold", 
              fontSize:24, 
              marginTop:5, 
              marginLeft:15, 
              color:"white",
              textShadowColor: 'rgba(0, 0, 0, 0.6)',
              textShadowOffset: { width: -2.5, height: 2.5 },
              textShadowRadius: 1
            }}>
              {props.name}
            </Text>
            
        </View>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
