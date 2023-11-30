import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExerciseScreen from '../screens/ExerciseScreen';
import DemoScreen from '../screens/DemoScreen';
import MapScreen from '../screens/MapScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutineScreen from '../screens/RoutineScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      //screenOptions={{headerShown: false}} 
      screenOptions={
        ({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Exercise') {
              iconName = 'format-list-bulleted';
            } else if (route.name === 'Demo') {
              iconName = 'badge-account';
            } else if (route.name === 'Map') {
              iconName = 'alien-outline';
            } else if (route.name === 'Routine') {
              iconName = 'billboard';
            }
            return <Icon
              name={iconName}
              size={size}
              color={color} />;
          },
        })}>
      <Tab.Screen 
        name="Exercise" 
        component={ExerciseScreen}
        options={{
          title: 'Lista de Ejercicios',
        }} />
      <Tab.Screen 
        name="Demo" 
        component={DemoScreen}
        options={{
          title: 'Demo',
        }}  />
      <Tab.Screen 
        name="Routine" 
        component={RoutineScreen}
        options={{
          title: 'Mi Rutina',
        }}  />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          title: 'Mapita',
        }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;