import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Pressable, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { Card } from '@rneui/base';
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
    }
};

const { width, height } = Dimensions.get('window');

const ModalEvent:  React.FunctionComponent<CardsComponentsProps> = ({ title, hours, date, imageLink, locale, description }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              <View>
                <Image style={styles.image} source={{uri: imageLink}}/>
              </View>
              <View>
                <Text>
                    <Text>Descrição: </Text>
                    <Text>{description}</Text>
                </Text>
                
                <Text>Informações:</Text>
                <Text>
                    Rua: {locale.rua}, Número: {locale.numero}, Bairro: {locale.bairro}
                </Text>
                <Text >
                    Cidade: {locale.cidade}
                </Text>
                
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>VOLTAR</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>VER DETALHES</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    modalView: {
      width: "70%",
      height: height*0.85,
      // margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      // padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    image:{
      // width: "50%",
      height: 200,     
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#fff',
    },
    buttonClose: {
      backgroundColor: '#fff',
    },
    textStyle: {
      color: '#1E90FF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    
});

export default ModalEvent;