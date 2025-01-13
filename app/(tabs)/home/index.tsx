import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import SearchBarComp from "@/components/searchBar";
import CardEvent from "@/components/cardEvent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/authProvider";
import { router } from "expo-router";

interface Event {
  id: string,
  title: string;
  event_date: string;
  time: string;
  // imageLink: string;
  description: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia: string;
  email_user: string;
}

export default function Home() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });

  const { user } = useAuth();
 
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/events', {
          headers:{
            Authorization: user?.token
          }
        } );
        const dados = response.data;
        // console.log(response.data)
        let vet: Event[] = [];
        Object.keys(dados).forEach(e =>{
          vet.push(dados[e])
        })
        setEvents(vet);
        
      }catch (error) {
        console.error("Erro ao buscar os eventos:", error);
      }
    };
    fetchData();
  }, [])
  // console.log(events[0].date)

  let imageLink = "https://th.bing.com/th/id/R.06db452fc12c1c27687799e8759bae75?rik=i2PMHbxsCyA2lw&riu=http%3a%2f%2fwww.aplausoeventos.com.br%2fwp-content%2fuploads%2f2019%2f11%2fevento77.jpg&ehk=FLkra0g1%2f91qxuDneGbfuXNUasTuWpk9whM5HybAUcw%3d&risl=&pid=ImgRaw&r=0"
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>
            <Text style={styles.titleBlack}>play</Text>
            <Text style={styles.titleBlue}>Events</Text>
          </Text>
        </View>
        <View style={styles.containerMesseger}>
          <Text style={styles.messegerText}>Encontre os melhores eventos e construa mémorias.</Text>
        </View>
        <SearchBarComp/>

        <View>
          {events.map((event, key) =>(
            <CardEvent 
            key={key}
            id={event.id}
            email_user={event.email_user} 
            title={event.title} 
            time={event.time} 
            event_date={event.event_date} 
            imageLink={imageLink} 
            description={event.description} 
            rua={event.rua} 
            numero={event.numero}
            bairro={event.bairro}
            cidade={event.cidade}
            cep={event.cep}
            referencia={event.referencia}
            />

          ))}
        </View>
        <View style={{marginBottom: "2%"}}></View>
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
})