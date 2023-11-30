import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { findById } from '../services/ExerciseService';
import { BASE_URL } from '../configs/constants';

const DetailExerciseScreen = () => {
  const route = useRoute();
  const { exerciseId } = route.params;
  const [exercise, setExercise] = useState({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200, // Ancho deseado
      height: 200, // Alto deseado
      borderRadius: 10, // Otras propiedades de estilo que puedes aplicar
    },
  });

  useEffect(() => {
    findById(exerciseId)
      .then(data => {
        //console.log(data);
        data.video_url = data.video_url.split('=')[1];
        setExercise(data);
      })
      .catch(error => {
        console.error('Error en obtener el ejercicio:', error);
      });
  }, []);


  return (
    <>
      <Text>Exercise ID: {exercise.id}, {BASE_URL + exercise.image_url }</Text>
      <Image
        source={{ uri: BASE_URL + exercise.image_url }}
        resizeMode="cover"
        style={styles.image}
      />
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={false}
        source={{ uri: `https://www.youtube.com/embed/${exercise.video_url}?rel=0&autoplay=0&showinfo=0&controls=0`}} />
    </>
  );
};

export default DetailExerciseScreen;