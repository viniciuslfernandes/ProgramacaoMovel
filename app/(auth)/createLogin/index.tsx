import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker"; 
import { EduVICWANTBeginner_400Regular } from "@expo-google-fonts/edu-vic-wa-nt-beginner";
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { Link, router } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useAuth } from "@/auth/authProvider";

export default function CreateLogin() {

  // const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [userCep, setUserCep] = useState('');
  const [userCidade, setUserCidade] = useState('');
  const [userEstado, setUserEstado] = useState('');
  const [userNumero, setUserNumero] = useState('');
  const [userRua, setUserRua] = useState('');
  const [userBairro, setUserBairro] = useState('');
  const [userIdade, setUserIdade] = useState(0)
  const [userGenero, setUserGenero] = useState("")
  const {signUp} = useAuth();
  
  const Cadastrar = async()=>{
    var jsonBody = {
      email: email, 
      password: password, 
      nameUser: nameUser,
    };
    console.log(jsonBody);
    try{
      await signUp(email, password, nameUser);
      router.replace('/(tabs)/home')
    }catch(error){
      console.error('Error:', error);
    }
  }
  
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });
  return (
    <View style={styles.container}>
      
      <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
        <View style={styles.containerLinha}>
          <Text style={styles.message}>Cadastre-se </Text>
      
          <Text>
            <Text style={styles.titleBlack}>play</Text>
            <Text style={styles.titleBlue}>Events</Text>
          </Text>
          
            
        </View>
      </Animatable.View>
          
      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.titleForm}>Nome Completo</Text>
        <TextInput style={styles.input} onChangeText={setNameUser} placeholder="Digite seu nome..." placeholderTextColor="#fff" />

        <Text style={styles.titleForm}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} placeholder="Digite seu email..." placeholderTextColor="#fff" />

        <Text style={styles.titleForm}>Senha</Text>
        <TextInput style={styles.input} onChangeText={setPassword} placeholder="Digite sua senha" placeholderTextColor="#fff"/>


        {/* <Link href={"../../(tabs)/home"}> */}
          <TouchableOpacity onPress={Cadastrar} style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        {/* </Link> */}

        <TouchableOpacity style={styles.buttonRegister} >
          <Link href="../singIn">
            <Text style={styles.buttonTextRegister}>Voltar</Text>
          </Link>
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
  containerLinha:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd:"5%"
  },
  titleBlack:{
    color:"#000",
    fontFamily:"EduVICWANTBeginner_400Regular",
    fontWeight:"bold",
    fontSize: 30,
  },
  titleBlue:{
    color: '#1E90FF',
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 30,
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
    color: "#fff"
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
  }
})