import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatComponent from "./ChatComponent"
import LoginScreen from "./loginScreen"
//const socket= io('https://chat-app-server420.herokuapp.com/');


const Stack= createStackNavigator();




export default function App(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} option={{title: 'Login'}}/>
        <Stack.Screen name="NameScreen" component={NameTaker} options={{ title: 'Username Form' }}/>
        <Stack.Screen name="ChatScreen" component={ChatComponent} options={{ title: 'Messages' }}/>
        </Stack.Navigator>
    </NavigationContainer>
    )

  }




//yet to apply
function NameTaker({navigation}) {
  
  const [name,setName]=useState("")

	  return <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>ENTER YOUR NAME</Text>
	    <TextInput
	    placeholder="name"
	    value={name}
	    onChangeText={text=>setName(text)}
      style={styles.input}
	    />
	    <TouchableOpacity
      style={styles.btn}
      onPress={()=>{
      if(name!="")
        {
         navigation.navigate('ChatScreen', {username: name})
        }}}
       >
	      <Text>
          Submit
	      </Text>
	      </TouchableOpacity>
        </View>
	  </View>
    
}





const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"#66f"
    },

    formContainer:{
      flex:0.5,
      backgroundColor:"#a9f",
      
      alignSelf: "center",
      alignItems:"center",
      justifyContent:"center",
      padding: 30,
      marginBottom:'auto',
      marginTop: "auto",
    },

    input:{
      alignSelf: "center",
      justifyContent:"center",
      width: 200,
      padding:10,
      margin:10,
      backgroundColor:"white",
    },

    btn:{
      alignSelf: "center",
      alignItems: "center",
      width:100,
      padding: 10,
      backgroundColor:"orange",
    },
});










//import {createSwitchNavigator, createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
//http://192.168.43.254:3000


// const MainNavigator=createStackNavigator({

//   NameScreen: NameTaker,
//   ChatScreen: ChatComponent,
// },
// {
// initialRouteName: 'ContactList'
// }
// )


// const MainContainer=createAppContainer(MainNavigator);



    // <MainContainer screenProps={ getName=this.getName, getAuthentication = this.checkAuthentication}/>
    //)
    // if(this.state.authenticated)
    // return(<ChatComponent userName={this.state.name}/>)
    // else
    // return (
    //         <NameTaker getName={(ele)=>this.getName(ele)} getAuthentication={this.checkAuthentication}/>
    // )
      
  //}