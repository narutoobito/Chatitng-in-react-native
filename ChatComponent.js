import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client"
import {Chatcontainer} from "./Components"





export default class ChatComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: props.route.params.username || "noName",
      messages: [],
      text: "",
      authenticated: false,
      activeUsers: []
    }
   //console.log(props.route) 
  }

  
  componentDidMount(){
        this.key=0
        this.socket = io('https://chat-app-server420.herokuapp.com/', {forceNode: true})

        //console.log("consol;ed" , this.socket.connected)
        this.userName()

        this.socket.on('chat-message', data =>{
        this.changeState({from:`${data.user}`,  title:`${data.message}`, key: Math.floor(Math.random()*10000)});
        })
    
        this.socket.on('user-connected',name =>{
        this.changeState({from: "server",title:`${name} connected`, key: Math.floor(Math.random()*10000)})
        this.socket.emit('get-active-users')
  
        })
        
    
        this.socket.on('user-disconnect',name=>{
        this.changeState({from: "server", title:`${name} disconnected`, key: Math.floor(Math.random()*10000)})
        this.socket.emit('get-active-users')

        })
        
        this.socket.on('all-users',({activeUsers})=>
        this.setState({activeUsers})
        )
        this.state.name=this.props.route.params.username

        this.socket.emit('get-active-users')
    }
  
    componentWillUnmount(){
      this.socket.emit('disconnect')
      
    }
  
    changeState = newmsg =>  this.setState(prev=>({messages: [...prev.messages,newmsg]}))
  
  
    makeNewMessage = () => ({ title: `this is a new message ${Math.floor(Math.random()*10000)}`, key: Math.floor(Math.random()*100) })
  
  
    userName=()=> {

      this.changeState({
        from: "server", 
        title: `You - (${this.state.name}) joined` , 
        key: Math.floor(Math.random()*10000),
      });
      this.socket.emit('new-user', this.state.name)
    }
   
    nameChange=(name)=>{
      this.setState({name})
    }
  
    socketTask=()=>{
      
    }
  
    textValChange=(ele)=>{
      this.setState({text: ele})
  
    }
  
    buttonPressed=()=>{
      if(this.state.text!=""){
      this.socket.emit('send-chat-message',this.state.text); 
      this.changeState({  from:"You",title:`${this.state.text}` , key: Math.floor(Math.random()*10000)});
      this.setState({text: ""})
      this.socket.emit('get-active-users',()=>console.log("gone"))
       //console.log("pressed");
      }
    }
  
  
    render(){
    return (
      
      <View style={styles.container}>
        <Text style={{ paddingTop: 20, color: "orange", fontSize: 20, alignSelf:"center",}}>Whatsapp Clone</Text>
       <Text style={{ paddingTop: 10, color: "#faa", fontSize: 15}}> {this.state.activeUsers.map(ele=><Text key={this.key++}>{ele},</Text>)}</Text>
        
      
        <Chatcontainer messages={this.state.messages}/>
        
  
        
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        
            <TextInput
            onChangeText={this.textValChange}
            multiline={true}
            value={this.state.text}
            placeholder="Write your message here"
            style={styles.input}
            />
    
            <TouchableOpacity 
            style={styles.btn}
            onPress={()=>this.buttonPressed()
            } 
            >
                 <Text>submit</Text>
            </TouchableOpacity>
          
        </KeyboardAvoidingView>
  
  
      </View>
    );
      
  }
  }
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 50,
      color: "#0f3",
      backgroundColor: "#55f",
      
    },
  
    input: {
      alignSelf:"center",
      width:220,
      backgroundColor: "#0ff",
      padding:5,
      color: "#444",
    
    },
  
    btn:{
      marginLeft:"auto",
      borderColor:"#0b0",
      borderRadius: 30,
      borderWidth:3,
      backgroundColor: "#090",
      padding: 6,
    }
  });
  