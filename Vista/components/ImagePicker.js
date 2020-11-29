import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { Button } from 'galio-framework';

export default function ImagePickerExample({onImagePicked}) {

  const { width, height } = Dimensions.get('screen');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      onImagePicked({uri: result.uri});
    }
  };

  const styles = StyleSheet.create({
    smallButton: {
      width: 75,
      height: 28,
    },
    Button: {
      width: width/1.70,
      height: height/13,
    },
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button style={styles.Button} onPress={pickImage} >
      Cargue una imagen para publicar
      </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>
  );
}

  