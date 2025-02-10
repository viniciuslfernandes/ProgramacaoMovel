import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/base';
import { Dimensions } from 'react-native';
import ModalEvent from '../modalEvent';
import { Avatar } from "react-native-elements";
import { Image } from 'react-native';
import { useAuth } from '@/auth/authProvider';
import axios from 'axios';
import { useRefreshPage } from "@/auth/refreshPages";


interface CardsComponentsProps {
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
    distancia:number
};

const { height } = Dimensions.get('window');
const CardEvent:  React.FunctionComponent<CardsComponentsProps> = ({ id, email_user, title, time, event_date, imgLink, rua, numero, bairro, cidade, cep, referencia, description, distancia}) => {

    const { user } = useAuth();
    const [edit, setEdit]= React.useState(false);
    const { setRefreshState } = useRefreshPage();

    React.useEffect(() => {
        if (user?.email === email_user) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [user?.email, email_user]);

    const formatedTime=(time:string)=>{
        const [hours, minutes] = time.split(':');
        return  `${hours}:${minutes} hrs`;
    }
    const dateFormatada = new Intl.DateTimeFormat('pt-BR').format(new Date(event_date))
    const timeFormatada = formatedTime(time)

    const Excluir = async(id: string)=>{
        try{
            const response = await axios.delete("http://3.209.65.64:3001/events", {
                data: { id }
            });
            setRefreshState("refreshHome", true)
        }
        catch(error){
            console.error('Error:', error);
        }
    }

    const Distancia = ({ distancia }: { distancia: number }) => {
        const distanciaFormatada = distancia.toFixed(2);
        return (
        <>
        <Text>
            <Text style={{fontWeight:"bold"}}>Distancia de você: </Text>
            <Text>{distanciaFormatada}km</Text>
        </Text>
        </>
    );
      };

  return (
    <View style={styles.container}>
        <Card>
            <View style={styles.containerHeaderCard}>
                <View style={styles.containerHeaderTitle}>
                    <Avatar
                        size="small"
                        rounded
                        title="R"
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{ backgroundColor: '#1E90FF' }}
                        titleStyle={{ color: 'white' }}
                    />
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
                <View>
                    <Text>{dateFormatada}</Text>
                    <Text>às {timeFormatada}</Text>
                </View>
            </View>
            
            <Card.Divider />

            <Card.Image
                style={styles.image}
                source={{
                    uri: imgLink,
                }}
            />
            
            <Text >
                <Text style={{fontWeight:"bold"}}>Descrição: </Text>
                <Text>{description}</Text>
            </Text>
           
            <Text>
                <Text style={{fontWeight:"bold"}}>Endereço: </Text>
                <Text style={{ marginBottom: 10 }}>
                {rua}, {numero}, {bairro}, {cidade}.
                </Text>
            </Text>
            <Distancia distancia={distancia}></Distancia>
            {edit? 
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={()=>Excluir(id)} style={styles.button}>
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            :<></>}
            
        </Card>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginBottom: "1%"
    },
    containerHeaderTitle:{
        flexDirection: 'row',
        marginBottom: "1%",
        alignItems: "center",
        width: "48%"
    },
    containerHeaderCard:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:"space-between"
    },
    textTitle:{
        marginStart: "1%",
        fontSize: 20,
        fontWeight: "bold",
        color: "grey"
    },
    image:{
        padding: 0,
        height:  height * 0.50,
        marginBottom: "1%",   
        borderColor: "grey",
        borderWidth: 1
    },
    containerButton:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "3%"
    },
    button:{
        backgroundColor: "red",
        width:"40%",
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold"
    },
});

export default CardEvent;