import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Link, router } from "expo-router";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useAuth } from "@/auth/authProvider";

export default function SingIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorretLogin, setIncorretLogin] = useState(false);
  const { signIn} = useAuth();
  
  const Logar = async()=>{
    var jsonBody = {email: email, password: password};
    console.log(jsonBody);
    try{
      await signIn(email, password);
      router.replace('/(tabs)/home')
      
    }catch(error){
      setIncorretLogin(true);
      console.error('Error:', error);
    }
  }
  return (
    <View style={styles.container}>
      <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
        <Text style={styles.message}> Bem-vindo(a) </Text>
      </Animatable.View>
    
      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.titleForm}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} placeholder="Digite seu email..." placeholderTextColor="#fff" />

        <Text style={styles.titleForm}>Senha</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChangeText={setPassword} placeholder="Digite sua senha" placeholderTextColor="#fff" />

        {/* <Link href={"../../(tabs)/home"}> */}
          <TouchableOpacity onPress={Logar} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        {/* </Link> */}

        <TouchableOpacity style={styles.buttonRegister} >
          <Link href="../createLogin">
            <Text style={styles.buttonTextRegister}>Não possui uma conta? Cadastre-se</Text>
          </Link>
          {incorretLogin ? <Text style={styles.userIncorreto}>Usuário ou senha incorretos</Text>:<></> }
            
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff'
  },
  containerHeader:{
    marginTop: "10%",
    marginBottom: "15%",
    paddingStart: "5%"
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF'
  },
  containerForm:{
    backgroundColor: "#1E90FF",
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  titleForm:{
    fontSize: 20,
    marginTop: 28,
    color: "#fff",
    fontWeight: "bold"
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    borderBottomColor: "#fff",
    fontSize: 16,
    color: "#fff",
  },
  button:{
    backgroundColor: "#fff",
    width:"100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText:{
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "bold"
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: "center",

  },
  buttonTextRegister:{
    color: "#fff"
  },
  userIncorreto:{
    marginTop: "2%",
    color: "red",
  }
})