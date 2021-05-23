import React from 'react';
import {  StyleSheet,Text,TouchableOpacity, View, ScrollView} from "react-native";

 function Chatmsg(props) {
    return (
      <TouchableOpacity 
      style={props.from === "You" ? styles.fromMe : (props.from==="server"? styles.fromServer : styles.elses)}
      >
        <Text>
          {props.from} : {props.prop}
            </Text>
        
      </TouchableOpacity>
    );
  }



 export function Chatcontainer(props) {
  
    return (
      <View
        style={styles.msgContainer}
      >
        <ScrollView style={{color:"white"}}>
        <Text style={{ color: "white", alignSelf:"center" }}>Chat content</Text>
        {
        props.messages.map( ele=> 
        <Chatmsg 
        prop={ele.title} from={ele.from} key={ele.key}
        />
        
      
        )}
        </ScrollView>
      </View>
    );
  }



  const styles = StyleSheet.create({
    msgContainer:{
        flex: 8,
        backgroundColor: "#457",
        width: "100%",
        overflow: "hidden"
      },

      fromMe:{ 
        margin:2,
        marginLeft:"auto",
         backgroundColor: "#99a",
        padding: 6,
      },

      fromServer:{
        margin:2,
        marginLeft:"auto",
        marginRight: "auto",
        alignItems:"center",
        backgroundColor: "#478",
        padding: 6,
      },

      elses:{
         
        margin:2, 
        backgroundColor: "#5af",
        padding: 6,
        marginRight:"auto",
    }
  })