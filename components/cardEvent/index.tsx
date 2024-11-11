import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/base';
import { Dimensions } from 'react-native';
import ModalEvent from '../modalEvent';
import { Avatar } from "react-native-elements";
import { Image } from 'react-native';

interface CardsComponentsProps {
    title: string;
    hours: string;
    date: string;
    imageLink: string;
    description: string;
    locale: {
        rua: string;
        numero: string,
        bairro: string,
        cidade: string,
        cep: string,
        referencia:string
    },
};
const { height } = Dimensions.get('window');
const CardEvent:  React.FunctionComponent<CardsComponentsProps> = ({ title, hours, date, imageLink, locale, description}) => {
    
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
                    <Text>{date}</Text>
                </View>
            </View>
            
            <Card.Divider />

            <Card.Image
                style={styles.image}
                source={{
                    uri: imageLink,
                }}
            />
            
            <Text >
                <Text style={{fontWeight:"bold"}}>Descrição: </Text>
                <Text>{description}</Text>
            </Text>
           
            <Text>
                <Text style={{fontWeight:"bold"}}>Endereço: </Text>

                <Text style={{ marginBottom: 10 }}>
                {locale.rua}, {locale.numero}, {locale.bairro}, {locale.cidade}.
                </Text>
            </Text>

            
            {/* <ModalEvent title={title} hours={hours} date={date} imageLink={imageLink} description={description} locale={locale}/> */}

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
});

export default CardEvent;