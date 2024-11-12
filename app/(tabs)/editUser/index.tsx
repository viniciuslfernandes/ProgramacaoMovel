import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from "react";
import {  TextInput, Provider as PaperProvider } from 'react-native-paper';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import { Avatar } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';

export default function cadastrarEvent() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <ScrollView style={styles.container}>
      <View >
        <View style={styles.header}>
          <Text>
            <Text style={styles.titleBlack}>play</Text>
            <Text style={styles.titleBlue}>Events</Text>
          </Text>
        </View>
        <View style={styles.containerAvatar}>
            <Avatar
                size="large"
                rounded
                title="R"
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                containerStyle={{ backgroundColor: '#1E90FF' }}
                titleStyle={{ color: 'white' }}
            />
        </View>
      </View>

      <View style={styles.containerForm}>
      
        <Text style={styles.subTitle}>Dados Pessoais:</Text>
       
        <TextInput label="Nome completo" mode="flat" style={styles.input} />
        <TextInput label="Email" mode="flat" style={styles.input} />
        

        <View style={styles.formRow}>
            <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue) => setSelectedGender(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Gênero" value="" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
            </Picker>
            <Picker
                selectedValue={selectedAge}
                onValueChange={(itemValue) => setSelectedAge(itemValue)}
                style={styles.picker}
            >
            <Picker.Item label="Idade" value="" />
                {ages.map((age) => (
                    <Picker.Item key={age} label={`${age} anos`} value={age} />
                ))}
            </Picker>
        </View>

        <View style={{marginTop:"4%"}}>
            <Text style={styles.subTitle}>Endereço:</Text>
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
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
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
  picker: { 
    fontSize: 15,
    width:"45%",
    borderBottomWidth: 1, 
    borderColor:"white",
    borderBottomColor: 'grey', 
    color: 'grey', 
    paddingVertical: 10,
  },
  subTitle:{
    fontSize: 22,
    fontWeight:"bold",
    marginBottom:"1%"
  },
  header:{
    marginTop: "6%",
    marginBottom: "3%",
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
  containerAvatar:{
    marginBottom: "2%",
    justifyContent:"center",
    alignItems:"center",
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
