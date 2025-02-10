import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import SearchBarComp from "@/components/searchBar";
import CardEvent from "@/components/cardEvent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/authProvider";
import { useRefreshPage } from "@/auth/refreshPages";
import { router } from "expo-router";
import { Card } from '@rneui/base';
import { Avatar } from "react-native-elements";

interface Event {
  id: string,
  title: string;
  event_date: string;
  time: string;
  imgLink: string;
  description: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia: string;
  email_user: string;
  distancia: number;
}

export default function Home() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });

  const { user } = useAuth();
  const { refreshHome, setRefreshState } = useRefreshPage();
  // console.log(refreshHome)

  const [userCep, setUserCep] = useState('');

  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false)
  
  const [search, setSearch] = useState('');

  async function obterCoordenadas(cep: string) {
    try {
        const url = `https://cep.awesomeapi.com.br/json/${cep}`;
        const response = await axios.get(url);

        if (!response.data || response.data.length === 0) {
            throw new Error(`CEP ${cep} não encontrado`);
        }

        return {
            latitude: parseFloat(response.data.lat),
            longitude: parseFloat(response.data.lng)
        };
    } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
        return null;
    }
}

function calcularDistancia(lat1:number, lon1:number, lat2:number, lon2:number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

async function CalcularDistanciaCeps(cep1:string, cep2:string) {
    console.log(cep1)
    console.log(cep2)
    const coord1 = await obterCoordenadas(cep1);
    const coord2 = await obterCoordenadas(cep2);
    console.log(coord1)
    console.log(coord2)
    const distancia = calcularDistancia(coord1?.latitude ?? 0, coord1?.longitude?? 0, coord2?.latitude ?? 0, coord2?.longitude?? 0);
    return distancia
}

  const fetchData = async()=>{
    try{
      const response = await axios.get('http://3.209.65.64:3001/events', {
        headers:{
          Authorization: user?.token
        },
        params:{
          search: search
        }
      } );

      const responseUser = await axios.get("http://3.209.65.64:3001/usuariosInformacoes", {
        params: {
          email: user?.email
        }, 
        headers:{
          Authorization: user?.token
        }
      });
      const userCep = responseUser.data.cep;
      setUserCep(userCep);
      
      const dados = response.data;
      const eventosComDistancia = await Promise.all(
        Object.keys(dados).map(async (e) => {
            const distancia = await CalcularDistanciaCeps(userCep, dados[e].cep);
            return { ...dados[e], distancia }; 
        })
    );
    const eventosOrdenados = eventosComDistancia.sort((a, b) => a.distancia - b.distancia);
    setEvents(eventosOrdenados);
    
    }catch (error) {
      console.error("Erro ao buscar os eventos:", error);
    }
  };


  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(); 
    setRefreshing(false); 
  };

  useEffect(() => {
    if (user?.token) {
      fetchData(); 
    }
    
    // console.log(refreshHome)
    if(refreshHome){
      fetchData(); 
      setRefreshState("refreshHome", false);
    }
    
  }, [refreshHome, search, userCep]);

  type ItemProps = {
    id: string
    email_user: string;
    title: string;
    time: string;
    event_date: string;
    imgLink: string;
    description: string;
    rua: string;
    numero: string,
    bairro: string,
    cidade: string,
    cep: string,
    referencia:string,
    distancia: number
  }
  const Item = ({ id, email_user, title, time, event_date, imgLink, rua, numero, bairro, cidade, cep, referencia, description, distancia}: ItemProps)=>(
    <CardEvent 
      id={id}
      email_user={email_user} 
      title={title} 
      time={time} 
      event_date={event_date} 
      imgLink={imgLink} 
      description={description} 
      rua={rua} 
      numero={numero}
      bairro={bairro}
      cidade={cidade}
      cep={cep}
      referencia={referencia}
      distancia = {distancia}
    />
  );

  // let imageLink = "https://th.bing.com/th/id/R.06db452fc12c1c27687799e8759bae75?rik=i2PMHbxsCyA2lw&riu=http%3a%2f%2fwww.aplausoeventos.com.br%2fwp-content%2fuploads%2f2019%2f11%2fevento77.jpg&ehk=FLkra0g1%2f91qxuDneGbfuXNUasTuWpk9whM5HybAUcw%3d&risl=&pid=ImgRaw&r=0"
  
  return (
  <SafeAreaProvider>
    <FlatList
      data={events}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          email_user={item.email_user}
          title={item.title}
          time={item.time}
          event_date={item.event_date}
          imgLink={item.imgLink}
          rua={item.rua}
          numero={item.numero}
          bairro={item.bairro}
          cidade={item.cidade}
          cep={item.cep}
          referencia={item.referencia}
          description={item.description}
          distancia = {item.distancia}
        />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>
              <Text style={styles.titleBlack}>play</Text>
              <Text style={styles.titleBlue}>Events</Text>
            </Text>
          </View>
          <View style={styles.containerMesseger}>
            <Text style={styles.messegerText}>
              Encontre os melhores eventos e construa mémorias.
            </Text>
          </View>
          <SearchBarComp search={search} setSearch={setSearch} />
          <View style={{ marginBottom: "2%" }} />
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      contentContainerStyle={{ paddingBottom: 16 }}

    />
  </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  container1:{
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