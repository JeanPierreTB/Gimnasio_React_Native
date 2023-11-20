import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { fetchAll as fecthExercises } from '../services/ExerciseService';
import { fetchAll as fecthBodyParts } from '../services/BodyPartService';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    fecthExercises()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Ejercicios:', error);
      });
    fecthBodyParts()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error en la solicitud Listar Partes del Cuerpo:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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