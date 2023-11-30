import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../configs/constants';

const HomeScreen = ({ navigation }) => {
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

export default HomeScreen;