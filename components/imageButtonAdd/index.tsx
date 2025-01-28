import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type UploadImgComponentProps = {
  uploadImg: string
  setUploadImg: (value: string) => void;
}

export default function ImagePickerButton( props: UploadImgComponentProps) {

  const {uploadImg, setUploadImg} = props

  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFile(result.assets?.[0]?.base64 || null);
    }
  };

  const onFileUpload = async () => {
    if (!file) {
      alert("Nenhuma imagem selecionada!");
      return;
    }

    setLoading(true);

    const clientId = "73a10c3fd6269de";
    const auth = "Client-ID " + clientId;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "base64"); 

    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      setLoading(false); 

      if (response.ok) {
        alert("Imagem salva com sucesso!");
        console.log("Imgur Response:", data);
        setUploadImg(data.data.link)
      } else {
        alert(`Erro no upload: ${data.data.error}`);
      }
    } catch (err) {
      setLoading(false);
      // console.error(err);
      alert("Erro ao fazer upload. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Adicinar imagem do evento" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && !loading && <Button onPress={onFileUpload} title="Salvar imagem" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "3%"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: "3%",
    marginBottom:"3%"
  },
});
