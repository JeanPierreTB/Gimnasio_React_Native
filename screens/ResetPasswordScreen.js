import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { resetPassword } from '../services/UserService';

const ResetPasswordScreen = ({ }) => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

  });

  const changePassword = () => {
    // Aquí puedes realizar acciones con los valores de los inputs
    console.log('Input DNI:', dni);
    console.log('Input Email:', email);
    // Puedes realizar más lógica aquí, como enviar los datos a un servidor, etc.
    resetPassword(dni, email)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error en cambiar la contraseña:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Reset Password Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="DNI"
        onChangeText={text => setDni(text)}
        value={dni}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button title="Cambiar Contraseña" onPress={changePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
  },
});

export default ResetPasswordScreen;