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
import { router } from "expo-router";

export default function cadastrarEvent() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });
  
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  
  const [userGenero, setUserGenero] = useState('');
  const [userIdade, setUserIdade] = useState<number | "">("");

  const[userName, setUserName] = useState("");
  const [userCep, setUserCep] = useState('');
  const [userCidade, setUserCidade] = useState('');
  const [userEstado, setUserEstado] = useState('');
  const [userNumero, setUserNumero] = useState('');
  const [userRua, setUserRua] = useState('');
  const [userBairro, setUserBairro] = useState('');

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE',
    'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://3.209.65.64:3001/usuariosInformacoes", {
          params: {
            email: user?.email
          }, 
          headers:{
            Authorization: user?.token
          }
        });
        console.log(response.data)
        setUserName(response.data.name_user)
        setUserIdade(Number(response.data.idade))
        setUserGenero(response.data.genero)
        setUserCep(response.data.cep)
        setUserCidade(response.data.cidade)
        setUserEstado(response.data.estado)
        setUserNumero(response.data.numero)
        setUserRua(response.data.rua)
        setUserBairro(response.data.bairro)
      } catch (error) {
        // setError('Erro ao fazer requisição');
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [user?.email]);

  const Editar = async()=>{
    var jsonBody = {
      email: user?.email,
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
      const response = await axios.put("http://3.209.65.64:3001/usuarios", jsonBody) 
      router.replace('/(tabs)/home');
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
        <TextInput label="Email" value={user?.email ?? ""} mode="flat" style={styles.input} />
        

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
                onValueChange={(itemValue) => setUserIdade(Number(itemValue))}
                style={styles.picker}
            >
              <Picker.Item label="Idade" value="" />
              {ages.map((age, index) => (
                  <Picker.Item key={index} label={`${age}`} value={age} />
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
          <Picker
            selectedValue={userEstado}
            onValueChange={(itemValue) => setUserEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Estado" value="" />
            {estados.map((estado, index) => (
              <Picker.Item key={index} label={estado} value={estado} />
            ))}
          </Picker>
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
    borderColor:"grey",
    borderBottomColor: 'grey', 
    color: '#565656', 
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
