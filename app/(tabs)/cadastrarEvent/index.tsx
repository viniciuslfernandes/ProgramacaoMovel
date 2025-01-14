import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from "react";
import {  TextInput, Provider as PaperProvider } from 'react-native-paper';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "@/auth/authProvider";
import axios from "axios";
import { router } from "expo-router";
import { format } from "date-fns";
import { Picker } from '@react-native-picker/picker';

export default function cadastrarEvent() {
  
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE',
    'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const [eventTitle, setEventTitle] = useState('');
  const [eventCep, setEventCep] = useState('');
  const [eventCidade, setEventCidade] = useState('');
  const [eventEstado, setEventEstado] = useState('');
  const [eventNumero, setEventNumero] = useState('');
  const [eventRua, setEventRua] = useState('');
  const [eventBairro, setEventBairro] = useState('');
  const [eventComplemento, setEventComplemento] = useState('');
  const [eventDescricao, setEventDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  
  const { user } = useAuth();

  const formatTime = (time: Date): string => format(time, "HH:mm:ss");
  const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

  const CriarEvent = async()=>{
    var jsonBody = {
      event_date : formatDate(date),
      description: eventDescricao,
      time: formatTime(time),
      title: eventTitle,
      email_user: user?.email,
      bairro: eventBairro,
      cep: eventCep,
      cidade: eventCidade,
      complemento: eventComplemento,
      estado: eventEstado,
      numero: eventNumero,
      rua: eventRua
    }
    console.log(jsonBody)
    try{
      const response = await axios.post("http://3.209.65.64:3001/events", jsonBody)
      // setDate(new Date());
      // setEventDescricao("");
      // setTime(new Date());
      // setEventTitle("");
      // setEventBairro("");
      // setEventCep("");
      // setEventCidade("");
      // setEventComplemento("");
      // setEventEstado("");
      // setEventNumero("");
      // setEventRua("");
      router.replace('/(tabs)/home')
      
    }catch(error){
      console.error('Error:', error);
    }
  }

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false); 
    if (selectedTime) setTime(selectedTime); 
  };

  const formatedTime=(time:string)=>{
    const [hours, minutes] = time.split(':');
    return  `${hours}:${minutes}`;
  }
  const timeFormatada = formatedTime(time.toLocaleTimeString())
  


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
        <TextInput label="Nome do Evento" mode="flat" style={styles.input} onChangeText={setEventTitle}/>
        
      <View style={styles.formRow}>
        <View style={styles.inputForm}>
          <Button title={date.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onChangeDate}
          />
          )}
        </View>
        <View style={styles.inputForm}>
          <Button title={timeFormatada} onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={onChangeTime}
          />
          )}
        </View>
   
      </View>
        
        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="CEP" mode="flat" style={styles.input} onChangeText={setEventCep}/>
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Cidade" mode="flat" style={styles.input} onChangeText={setEventCidade} /> 
          </View>
        </View>

        <View style={styles.formRow}>

          <Picker
            selectedValue={eventEstado}
            onValueChange={(itemValue) => setEventEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Estado" value="" />
            {estados.map((estado, index) => (
              <Picker.Item key={index} label={estado} value={estado} />
            ))}
          </Picker>

          <View style={styles.inputForm}>
          <TextInput label="Número" mode="flat" style={styles.input} onChangeText={setEventNumero}/> 
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputForm}>
            <TextInput label="Rua" mode="flat" style={styles.input} onChangeText={setEventRua}/>
          </View>
          <View style={styles.inputForm}>
          <TextInput label="Bairro" mode="flat" style={styles.input} onChangeText={setEventBairro}/> 
          </View>
        </View>
        <TextInput label="Complemento" mode="flat" style={styles.input} onChangeText={setEventComplemento}/>
        <TextInput label="Descrição do evento" mode="flat" style={styles.input}  onChangeText={setEventDescricao}/>
        <View style={styles.containerButton}>

          <TouchableOpacity onPress={CriarEvent} style={styles.button}>
            <Text style={styles.buttonText}>Criar</Text>
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
  picker: { 
    fontSize: 15,
    width:"45%",
    borderBottomWidth: 2, 
    borderColor:"grey",
    borderBottomColor: 'grey', 
    color: '#565656', 
    paddingVertical: 10,
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
    justifyContent: "space-between",
    marginTop:"2%",
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
