import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BASE_URL } from '../configs/constants';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <Text>¡Bienvenido a la pantalla de inicio! {BASE_URL}</Text>
      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Ir a Reset Password"
        onPress={() => navigation.navigate('ResetPassword')}
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