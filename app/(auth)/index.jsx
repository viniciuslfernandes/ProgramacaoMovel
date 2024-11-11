import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
// import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable' 




export default function Initial() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
  });

  // const navigation = useNavigation();

  return (

    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Animatable.Text animation="fadeInDown" duration={2000} delay={500} style={styles.textEvent}>Events</Animatable.Text>
      </View>
      <Animatable.View animation="fadeInUp"  duration={2000} delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Encontre os melhores eventos e construa mémorias.</Text>
        <Text style={styles.text}>Faça login para começar</Text>
        
          <TouchableOpacity  style={styles.button} href="singIn">
              <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
      </Animatable.View>

    </View>


    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Create Login</Text>
    //   <Link href="(auth)">Voltar para login</Link>
    // </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  containerTitle:{
    flex:2,
    backgroundColor:"fff",
    justifyContent:"center",
    alignItems:"center"
  },
  textEvent:{
    color: '#1E90FF',
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 40, 
    fontWeight:'bold',
  },
  containerForm:{
    flex:1,
    backgroundColor:"#1976D2",
    borderTopLeftRadius:25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",

  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    color: "#fff"
  },
  text:{
    color:"#fff"
  },
  button:{
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius:50,
    paddingVertical: 8,
    width: "60%",
    alignSelf:"center",
    bottom:"15%",
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText:{
    fontSize: 18,
    fontWeight:"bold",
    color: "#000",
  }
})
