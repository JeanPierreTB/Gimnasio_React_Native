import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { resetPassword } from '../services/UserService';
import imagen from '../assets/favicon.png';

const ResetPasswordScreen = ({ navigation }) => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Any side effects you want to handle on component mount
  }, []);

  const changePassword = () => {
    // Aquí puedes realizar acciones con los valores de los inputs
    console.log('Input dni:', dni);
    console.log('Input email:', email);
    // Puedes realizar más lógica aquí, como enviar los datos a un servidor, etc.
    resetPassword(dni,email)
      .then(data => {
        console.log(data);
        setMessage(data.message);
        if (data.success) {
          setDni("");
          setEmail("");
          setMessage("");
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error('Error en cambiar la contraseña:', error);
      });
  };

  return (
    <View style={styles.principal}>
      <View style={styles.logo}>
        <Image source={imagen} style={styles.imagen} />
        <Text>Gimnasio Ulima</Text>
      </View>

      <View style={styles.cuadro}>
        <Text style={styles.texto}>Solicite cambio de contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="DNI"
          onChangeText={(text) => setDni(text)}
          value={dni}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.texto}>{message}</Text>
        <Button color="orange" title="Enviar correo" onPress={changePassword} />
        
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 70,
  },
  logo: {
    alignItems: 'center',
  },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  cuadro: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 30,
    width: 300,
    height: 280,
    borderRadius: 20,
    flexDirection: 'column',
    gap: 10,
  },
  texto: {
    textAlign: 'center',
  },
  boton: {
    borderRadius: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
});

export default ResetPasswordScreen;

