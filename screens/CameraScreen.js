import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { upload } from '../services/FileService';
import { BASE_URL } from '../configs/constants';
//import * as Permissions from 'expo-permissions';

export default function App() {
  const [urlImage, setUrlImage] = useState('ejercicios/abdomen04.png');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      //const mediaLibraryPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      //setHasPermission(cameraPermission.granted && mediaLibraryPermission.granted);
      setHasPermission(cameraPermission.granted);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo);
      if (Platform.OS === 'android') {
        await MediaLibrary.saveToLibraryAsync(photo.uri); // Guardar en la galería (solo para Android)
        console.log(photo.uri);
        upload(photo.uri)
          .then(data => {
            alert(data);
            console.log(BASE_URL + urlImage)
            setUrlImage(data);
          })
          .catch(error => {
            console.error('Error en cambiar la subir el archivo:', error);
          });
      } else {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        const album = await MediaLibrary.getAlbumAsync('Expo');
        if (album === null) {
          await MediaLibrary.createAlbumAsync('Expo', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
        }
      }
    }
  };

  const switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se ha concedido acceso a la cámara</Text>;
  }

  const styles = StyleSheet.create({
    item: {
      flex: 1,
      margin: 5,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });

  return (
    <View style={{ flex: 1 }}>

    <Image
        style={styles.image}
        source={{ uri: BASE_URL + urlImage }}
        resizeMode="cover"
        onError={(err) => console.log(err)}
      />

      <Camera
        style={{ height: '70%' }}
        type={cameraType}
        ref={(ref) => {
          setCameraRef(ref);}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingTop: 30, }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',}}
            onPress={switchCamera}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Cambiar cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',}}
            onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Capturar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
