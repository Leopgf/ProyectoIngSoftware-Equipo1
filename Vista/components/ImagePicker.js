import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { Button } from 'galio-framework';
import { cloudinary } from 'cloudinary-react';

export default function ImagePickerExample({ onImagePicked, defaultImage }) {
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

    if (!result.cancelled) {
      let file = {
        uri: result.uri,
        type: `test/${result.uri.split('.').pop()}`,
        name: result.uri,
      };

      let apiUrl = 'https://api.cloudinary.com/v1_1/mixosteam/image/upload';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zc9ttas7');
      formData.append('cloud_name', 'mixosteam');

      await fetch(apiUrl, {
        body: formData,
        method: 'POST',
      })
        .then(async (r) => await r.json())
        .then((dato) => {
          console.log('TOY AQUIIII');
          setImage(dato.secure_url);
          onImagePicked({ uri: dato.secure_url });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const styles = StyleSheet.create({
    smallButton: {
      width: 75,
      height: 28,
    },
    Button: {
      width: width / 2.5,
      height: height / 20,
      shadowOpacity: 0,
    },
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',shadowOpacity: 0}}>
      <Button style={styles.Button} onPress={pickImage}>
        Subir imagen
      </Button>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}
      {defaultImage && !image && (
        <Image source={{ uri: defaultImage }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}
    </View>
  );
}
