import React, {useState}from 'react'
import {View, Text ,Button, TextInput,StyleSheet} from 'react-native'

export default function LoginScreen({navigation})
{
// state={
// username: '',
// password: '',
// warnings: 'type username and password',
// }

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [warning,setWarning] = useState('')



//http://192.168.43.208:2018/
// _handleNavigatiion= async ()=>{
//         let result=null;
//         setWarning( "LOADING....")
//         let response = await fetch('https://narutoobito-loginreact.herokuapp.com/login',{
//                                     method:'POST' ,
//                                     headers:
//                                             {'Content-Type' : 'application/json'},
//                                             body: JSON.stringify({username: this.state.username, password: this.state.password })
//                                             })
//         result = await response.json()
//         if(result){
//         if(result.ok=== true)
//             navigation.navigate('NameScreen')
//         else setWarning(result.message)
//         }
// }

//const options={
//    method: 'POST',
//    headers: {
//    'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({username:"username",password:"password"})
//    };

// handleNameChange=name=>{
// setUsername(name)
//}

function handlePasswordChange(pass){
setPassword(pass)
}


return(
        <View style={{flex:1,justifyContent: 'center',alignItems:'center', background: 'red'}}>
        <TextInput
        placeholder="username"
        value={username}
        onChangeText={name=>setUsername(name)}
        style={styles.inputs}
        autoFocus={true}
        blurOnSubmit={true}
        autoCapitalize={'none'}
        />
        <TextInput
        placeholder="password"
        value={password}
        onChangeText={handlePasswordChange}
        blurOnSubmit={true}
        autoCapitalize={'none'}
        keyboardType={'visible-password'}
        style={styles.inputs}
        />
        <Button title="LogIN" 
        onPress={async ()=>{
        let result=null;
        setWarning( "LOADING....")
        let response = await fetch('https://narutoobito-loginreact.herokuapp.com/login',{
                                    method:'POST' ,
                                    headers:
                                            {'Content-Type' : 'application/json'},
                                            body: JSON.stringify({username: username, password: password })
                                            })
        result = await response.json()
        if(result){
        if(result.ok=== true)
            navigation.navigate('NameScreen')
        else setWarning(result.message)
        }
        }} 
        disabled={username!=''?false:true}>

        </Button>
        <Text style={styles.warnings}>{warning}</Text>
        </View>
    )
}



styles=StyleSheet.create({
 inputs:{
    padding: 10,
    backgroundColor:"orange",
    margin:10,
    width: "90%",
 },

 warnings:{
     margin:50,
    color: "red",

 }
})