import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker"; 
import { EduVICWANTBeginner_400Regular } from "@expo-google-fonts/edu-vic-wa-nt-beginner";
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { Link } from "expo-router";
export default function CreateLogin() {
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
        <Text style={styles.titleForm}>Nome</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome..." />

        <Text style={styles.titleForm}>Email</Text>
        <TextInput style={styles.input} placeholder="Digite seu email..." />

        <Text style={styles.titleForm}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" />


        <Link href={"../../(tabs)/home"}>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </Link>

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
    marginTop: "3%",
    marginBottom: "3%",
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