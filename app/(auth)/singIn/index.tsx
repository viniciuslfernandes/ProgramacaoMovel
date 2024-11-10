import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function SingIn() {
  return (
    <View style={styles.container}>
      <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
        <Text style={styles.message}> Bem-vindo(a) </Text>
      </Animatable.View>
    
    
      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.titleForm}>Email</Text>
        <TextInput style={styles.input} placeholder="Digite seu email..." />

        <Text style={styles.titleForm}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" />


        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.buttonTextRegister}>Não possui uma conta? Cadastre-se</Text>
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
    marginTop: "14%",
    marginBottom: "8%",
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