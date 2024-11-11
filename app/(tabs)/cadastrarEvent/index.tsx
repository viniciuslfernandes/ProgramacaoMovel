import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from "react";
import {  TextInput, Provider as PaperProvider } from 'react-native-paper';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';

export default function cadastrarEvent() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });
  const [eventTitle, setEventTitle] = useState('');
  return (
    <ScrollView style={styles.container}>
      <View >
        <View style={styles.header}>
          <Text>
            <Text style={styles.titleBlack}>play</Text>
            <Text style={styles.titleBlue}>Events</Text>
          </Text>
        </View>
        <View style={styles.containerMesseger}>
          <Text style={styles.messegerText}>Cadastre seu evento</Text>
        </View>
      </View>

      <View style={styles.containerForm}>
        <TextInput label="Nome do Evento" mode="flat" style={styles.input} />
        
        <View>
          {/* data e hora */}
        </View>
        
        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="CEP" mode="flat" style={styles.input} />
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Cidade" mode="flat" style={styles.input} /> 
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="Estado" mode="flat" style={styles.input} />
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Número" mode="flat" style={styles.input} /> 
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="Rua" mode="flat" style={styles.input} />
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Bairro" mode="flat" style={styles.input} /> 
          </View>
        </View>
        <TextInput label="Complemento" mode="flat" style={styles.input} />
        <TextInput label="Descrição do evento" mode="flat" style={styles.input} />
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  header:{
    marginTop: "6%",
    marginBottom: "3%",
    paddingStart: "5%",
    justifyContent:"center",
    alignItems:"center"
  },
  titleBlack:{
    color:"#000",
    fontFamily:"EduVICWANTBeginner_400Regular",
    fontWeight:"bold",
    fontSize: 40,
  },
  titleBlue:{
    color: '#1E90FF',
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 40,
  },
  containerMesseger:{
    marginBottom: "2%",
    paddingStart: "5%",
    justifyContent:"center",
    alignItems:"center",
  },
  messegerText:{
    fontSize: 20
  },
  containerForm:{
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  titleForm:{
    fontSize: 20,
    marginTop: 28,
    color: "#000",
    fontWeight: "bold"
  },
  input:{
    backgroundColor: 'transparent',
    marginBottom: "1%"
  },
  formRow:{
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  inputForm:{
    width:"45%",
  },
  containerButton:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%"
  },
  button:{
    backgroundColor: "#1E90FF" ,
    borderRadius: 4,
    width: '40%',
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    // maxWidth: '40%',
  },
  buttonText:{
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
})
