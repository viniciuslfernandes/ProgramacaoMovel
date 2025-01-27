import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type SearchBarComponentProps = {
  search: string;
  setSearch: (value: string) => void;
};


export default function SearchBarComp(props: SearchBarComponentProps) {
    const {search, setSearch} = props;
    const updateSearch = (search: string) => {
        setSearch(search);
    };
    // console.log(search)
  return (
    <View style={styles.view}>
        <SearchBar
        placeholder="Eventos"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        />
    </View>
  );
}
const styles = StyleSheet.create({
view: {
  marginBottom: "5%",
  paddingStart: "20%",
  marginEnd: "20%",
},
container:{
  backgroundColor: "#fff",
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "black",
  padding: 0,
},
inputContainer:{
  backgroundColor: 'white',
  borderRadius: 5,
},
input:{
  color: 'black',
}
});
