import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import Swiper from "react-native-swiper";
import {categories} from "../medi_data/categories";
import CategoryCard from "../components/CategoryCard";
import {firebase} from '../config'



const Dashboard=(props)=>{
    const [name, setName] = useState('')

    useEffect(()=>{
      
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot)=>{
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const swiperData = [
      {
        displayText: "Want to get the details of your doctors ?",
        img: require("../assets/doc_swiper.png"),
        navigateTo: "Research",
      },
    
      {
        displayText: "Want to check the routine ?",
        img: require("../assets/rout_swiper.png"),
        navigateTo: "Quiz",
      },
    
      {
        displayText: "Forgot the prescription ?",
        img: require("../assets/presc_swiper.png"),
        backgroundColor: "#ffeaa7",
        navigateTo: "Healthy Brain",
      },
      {
        displayText: "What is your immunizations ?",
        img: require("../assets/immuni_swiper.jpg"),
        backgroundColor: "#ffeaa7",
        navigateTo: "Healthy Brain",
      },
      {
        displayText: "Your health insurance at one place",
        img: require("../assets/insur_swiper.jpg"),
        backgroundColor: "#ffeaa7",
        navigateTo: "Healthy Brain",
      },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:16,color:"green", flex:0.04,paddingLeft:10,textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: -0.5, height: 0.5 },
              textShadowRadius: 1}}>
              Hello, {name.firstName} {name.lastName} 
            </Text>
            <View
          style={{
           flex:0.37,
           alignItems:"center",
          }}
        >
          <Swiper style={{ height: "100%" }} autoplay={true} dotColor="#ffeaa7">
            {swiperData.map((item, index) => (
              <View key={index} >
                <Image source={item.img} style={styles.swiperImage} />

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#000",
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {item.displayText}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>
            <View style={{flex:0.69,  }}>
              <FlatList 
                data={categories}
                keyExtractor={(item) => item.c_name}
                renderItem={({ item }) => (
                  <TouchableOpacity   onPress={()=>{props.navigation.navigate(item.c_screen)}}>
                     <CategoryCard categoryInfo={item}/>
                  </TouchableOpacity>
                )}
              />
              
            
            </View>
            
           {/*  <TouchableOpacity
                onPress={()=>{firebase.auth().signOut()}}
                style= {styles.button}
            >
                <Text style={{fontSize:20, fontWeight:"bold", color:"#fff"}}>Sign out</Text>
            </TouchableOpacity> */}
           {/*  <Image source={require("../assets/wave.png")} 
            style={{
              flex:0.34,
              width:400, 
              alignSelf:"center"           
            }}/> */}
       
        </SafeAreaView>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    padding:20
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
  },
  paragraph:{
    fontSize:14,
    textAlign:"left",
    padding:20,
    justifyContent:"center",
    
  },
  swiperImage: {
    width: "95%",
    height: 125,
    marginTop: 20,
    borderRadius: 20,
    alignSelf: "center",
    opacity: 0.9,
    position: "relative",
  },
});


export default Dashboard;
