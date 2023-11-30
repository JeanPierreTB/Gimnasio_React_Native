// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DetailExerciseScreen from '../screens/DetailExerciseScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} />
        <Stack.Screen 
          name="DetailExercise" 
          component={DetailExerciseScreen} />
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPasswordScreen} 
          options={{ title: 'Cambiar Contraseña' }} />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ title: 'Prueba de cámara' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;