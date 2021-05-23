import React from "react";
import {} from "react-native"

const socket= io('https://chat-app-server420.herokuapp.com/');


export default class Chats extends React.Component{
    state = {
        messages: ["abcd"],
      };

    
    socketTask=()=>{
    //this.changeState('You joined');
    //socket.emit('new-user', "moxley")

    socket.on('chat-message',data =>{
    this.changeState(`${data.user} : ${data.message}`);
    })

    socket.on('user-connected',data =>{
    this.changeState(`${data} connected`)
    })

    socket.on('user-disconnect',name=>{
    this.changeState(`${name} disconnected`)
    })}
    

    changeState = newmsg => { this.setState(prev=>({messages: [...prev.messages,newmsg]}))}

    render(){
        return(
                {socketTask()}
        );
    }
}