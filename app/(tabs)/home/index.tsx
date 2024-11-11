import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { EduVICWANTBeginner_400Regular } from '@expo-google-fonts/edu-vic-wa-nt-beginner';
import SearchBarComp from "@/components/searchBar";
import CardEvent from "@/components/cardEvent";

export default function Home() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    EduVICWANTBeginner_400Regular
  });

  const events = [
    {
      title: "Festa Universitária",
      date: "16 de Setembro de 2017",
      hours: "20:00 AM",
      imageLink: "https://th.bing.com/th/id/R.06db452fc12c1c27687799e8759bae75?rik=i2PMHbxsCyA2lw&riu=http%3a%2f%2fwww.aplausoeventos.com.br%2fwp-content%2fuploads%2f2019%2f11%2fevento77.jpg&ehk=FLkra0g1%2f91qxuDneGbfuXNUasTuWpk9whM5HybAUcw%3d&risl=&pid=ImgRaw&r=0",
      description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.",
      locale: {
          rua: 'Rua Ficticia',
          numero: '123',
          bairro: 'Bairro Inventado',
          cidade: 'Leopoldina',
          cep: '36772258',
          referencia:'Sem referência'
      },
      key: "0"
    },
    {
      title: "Música ao vivo",
      date: "16 de Setembro de 2017",
      hours: "20:00 AM",
      imageLink: "https://th.bing.com/th/id/R.06db452fc12c1c27687799e8759bae75?rik=i2PMHbxsCyA2lw&riu=http%3a%2f%2fwww.aplausoeventos.com.br%2fwp-content%2fuploads%2f2019%2f11%2fevento77.jpg&ehk=FLkra0g1%2f91qxuDneGbfuXNUasTuWpk9whM5HybAUcw%3d&risl=&pid=ImgRaw&r=0",
      description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.",
      locale: {
          rua: 'Rua Imaginaria',
          numero: '789',
          bairro: 'Bairro Inventado',
          cidade: 'Leopoldina',
          cep: '36772258',
          referencia:'Sem referência'
      },
      key: "1"
    },
  ]

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
          {events.map((event) =>(
            <CardEvent key={event.key} title={event.title} hours={event.hours} date={event.date} imageLink={event.imageLink} description={event.description} locale={event.locale}/>
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