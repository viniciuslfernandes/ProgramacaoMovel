import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import {  TextInput, Provider as PaperProvider } from 'react-native-paper';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import { Avatar } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { useAuth } from "@/auth/authProvider";


export default function cadastrarEvent() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });
  
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  
  const [userGenero, setUserGenero] = useState('');
  const [userIdade, setUserIdade] = useState('');

  const[userName, setUserName] = useState("");
  const [userCep, setUserCep] = useState('');
  const [userCidade, setUserCidade] = useState('');
  const [userEstado, setUserEstado] = useState('');
  const [userNumero, setUserNumero] = useState('');
  const [userRua, setUserRua] = useState('');
  const [userBairro, setUserBairro] = useState('');

  const { userEmail } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.3.5:3000/usuariosInformacoes", {
          params: {
            email: userEmail
          }
        });
        setUserName(response.data.name_user)
        setUserCep(response.data.cep)
        setUserCidade(response.data.cidade)
        setUserEstado(response.data.estado)
        setUserNumero(response.data.numero)
        setUserRua(response.data.rua)
        setUserBairro(response.data.bairro)
        // console.log(response.data)
        
      } catch (err) {
        // setError('Erro ao fazer requisição');
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [userEmail]);

  const Editar = async()=>{
    var jsonBody = {
      email: userEmail,
      name_user: userName,
      cep: userCep,
      genero: userGenero,
      idade: userIdade,
      cidade: userCidade,
      estado: userEstado,
      numero: userNumero,
      rua: userRua,
      bairro: userBairro
    }    
    try{
      const response = await axios.put("http://192.168.3.5:3000/usuarios", jsonBody) 
    }catch(error){
      console.error('Error:', error);
    }
  }


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
        <TextInput label="Nome completo" value={userName} onChangeText={setUserName} mode="flat" style={styles.input}/>
        <TextInput label="Email" value={userEmail ?? ""} mode="flat" style={styles.input} />
        

        <View style={styles.formRow}>
            <Picker
                selectedValue={userGenero}
                onValueChange={(itemValue) => setUserGenero(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Gênero" value="" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
            </Picker>
            <Picker
                selectedValue={userIdade}
                onValueChange={(itemValue) => setUserIdade(itemValue)}
                style={styles.picker}
            >
            <Picker.Item label="Idade" value="" />
                {ages.map((age) => (
                    <Picker.Item key={age} label={`${age}`} value={age} />
                ))}
            </Picker>
        </View>

        <View style={{marginTop:"4%"}}>
            <Text style={styles.subTitle}>Endereço:</Text>
        </View>
        
        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="CEP" mode="flat" value={userCep} style={styles.input}  onChangeText={setUserCep}/>
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Cidade" mode="flat" value={userCidade} style={styles.input} onChangeText={setUserCidade}/> 
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="Estado" mode="flat" value={userEstado} style={styles.input} onChangeText={setUserEstado}/>
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Número" mode="flat" value={userNumero} style={styles.input} onChangeText={setUserNumero} /> 
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="Rua" mode="flat" value={userRua} style={styles.input} onChangeText={setUserRua}/>
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Bairro" mode="flat" value={userBairro} style={styles.input} onChangeText={setUserBairro}/> 
          </View>
        </View>
        {/* <TextInput label="Complemento" mode="flat" style={styles.input} /> */}
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={Editar} style={styles.button}>
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
