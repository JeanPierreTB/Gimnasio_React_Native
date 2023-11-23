import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExerciseScreen from '../screens/ExerciseScreen';
import DemoScreen from '../screens/DemoScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}} 
    >
      <Tab.Screen 
        name="Exercise" 
        component={ExerciseScreen} />
      <Tab.Screen 
        name="Demo" 
        component={DemoScreen} />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;