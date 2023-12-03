import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../configs/constants';
import imagen from '../assets/favicon.png';
import { login } from '../services/UserService';

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [message, setmessage] = useState('');

  useEffect(() => {
    // Any side effects you want to handle on component mount
  }, []);

  const handleclik = () => {
    console.log('Input usuario:', usuario);
    console.log('Input password:', password);
  
    login(usuario, password)
      .then((data) => {
        console.log(data);
        setmessage(data.message);
  
        // Assuming "homescreen" is the name of your home screen in the stack navigator
        if (data.success) {
          setUsuario("");
          setPassword("");
          setmessage("");
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };
  

  return (
    <View style={styles.principal}>
      <View style={styles.logo}>
        <Image source={imagen} style={styles.imagen} />
        <Text>Gimnasio Ulima</Text>
      </View>

      <View style={styles.cuadro}>
        <Text style={styles.texto}>Ingresa esta informacion</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(text) => setUsuario(text)}
          value={usuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Text style={styles.texto}>{message}</Text>
        <Button color="orange" title="Login" onPress={handleclik} />
        <Text style={styles.texto}>
          No tienes una cuenta?{' '}
          <Text style={{ color: 'orange' }}>Creala aqui</Text>
        </Text>
      </View>

      <Text>
        Olvidaste tu contraseña?{' '}
        <Text
          style={{ color: 'orange' }}
          onPress={() => navigation.navigate('ResetPassword')}>
          Recuperala aqui
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 120,
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

export default LoginScreen;


/*const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('0');

  useEffect(() => {
  });

  const access = async () => {
    await SecureStore.setItemAsync('userId', userId);
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text>¡Bienvenido a la pantalla de inicio! {BASE_URL}</Text>
      <TextInput
        style={styles.input}
        placeholder="Id del Usuario"
        onChangeText={text => setUserId(text)}
        value={userId} />
      <Button
        title="Ingresar"
        onPress={access} />
      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate('Home')} />
      <Button
        title="Ir a Reset Password"
        onPress={() => navigation.navigate('ResetPassword')} />
      <Button
        title="Ir a Cámara"
        onPress={() => navigation.navigate('Camera')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default HomeScreen;*/