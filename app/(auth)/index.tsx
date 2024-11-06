import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { Link } from "expo-router";
export default function Login() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
  });
  return (

    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.textEvent}>Events</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Encontre os melhores eventos e construa mémorias.</Text>
        <Text style={styles.text}>Faça login para começar</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>

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
