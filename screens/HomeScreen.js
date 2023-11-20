import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { fetchAll as fecthExercises } from '../services/ExerciseService';
import { fetchAll as fecthBodyParts } from '../services/BodyPartService';

const HomeScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    fecthExercises()
      .then(data => {
        //console.log(data);
        setExercises(data);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Ejercicios:', error);
      });
    fecthBodyParts()
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
  
  const bodyPartSelected = (bodyPartId) => {
    if(bodyPartId != null){
      fecthExercises(bodyPartId)
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <RNPickerSelect
        placeholder={{ label: 'Seleccionar una parte del cuerpo', value: null }} 
        style={pickerSelectStyles}
        onValueChange={(bodyPartId) => bodyPartSelected(bodyPartId)}
        items={bodyParts}
      />
      <Button
        title="Ir a Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;