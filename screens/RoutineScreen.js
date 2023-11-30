import React, {useEffect, useState} from 'react';
import { BASE_URL } from '../configs/constants';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import { fetchBodyParts, fetchExercisesBodyPartsCount, fetchExercises } from '../services/MemberService';

const RoutineScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [exercisesCount, setExercisesCount] = useState([]);
  const [bodyPartsCount, setBodyPartsCount] = useState([]);

  useEffect(async () => {
    const userId = await SecureStore.getItemAsync('userId');
    // get counts
    fetchExercisesBodyPartsCount(userId)
      .then(data => {
        setExercisesCount(data.exercises);
        setBodyPartsCount(data.body_parts);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Partes del Cuerpo:', error);
      });
    // get exercises
    fetchExercises(userId)
      .then(data => {
        setExercises(data);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Ejercicios:', error);
      });
    // get body parts
    fetchBodyParts(userId)
      .then(data => {
        //console.log(data);
        const options = data.map(item => (
          {
            label: item.name,
            value: item.id
          }
        ));
        // console.log(options)
        setBodyParts(options);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Partes del Cuerpo:', error);
      });
  }, []);

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });
  
  const bodyPartSelected = async (bodyPartId) => {
    const userId = await SecureStore.getItemAsync('userId');
    if(bodyPartId != null){
      fetchExercises(userId, bodyPartId)
        .then(data => {
          //console.log(data);
          setExercises(data);
        })
        .catch(error => {
          console.error('Error en la solicitud Listar Ejercicios:', error);
        });
    }
  };

  const styles = StyleSheet.create({
    
  });

  const exerciseClick = (exerciseId) => {
    navigation.navigate('DetailRoutine', {
      exerciseId: exerciseId
    });
    // Coloca aquí la lógica que deseas ejecutar al hacer clic en la imagen
  };

  const renderItem = ({ item }) => {
    //console.log('++++++++++++++++++++++++++++++')
    //console.log(BASE_URL + item.image_url)
    return (
      <View style={stylesFlatList.item}>
        <TouchableOpacity onPress={() => exerciseClick(item.id)}>
          <Image
            style={stylesFlatList.image}
            source={{ uri: BASE_URL + item.image_url }}
            resizeMode="cover"
            onError={(err) => console.log(err)}
          />
          <Text style={stylesFlatList.title}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const stylesFlatList = StyleSheet.create({
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
    <View style={styles.container}>
      {/*<Text>Exercise</Text>*/}
      <Text>Cantidad de Ejercicios {exercisesCount}</Text>
      <Text>Cantidad de Partes del Cuerpo Entrenadas {bodyPartsCount}</Text>
      <RNPickerSelect
        placeholder={{ label: 'Seleccionar una parte del cuerpo', value: null }} 
        style={pickerSelectStyles}
        onValueChange={(bodyPartId) => bodyPartSelected(bodyPartId)}
        items={bodyParts}
      />
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Número de columnas
      />
      <Button
        title="Ir a Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default RoutineScreen;