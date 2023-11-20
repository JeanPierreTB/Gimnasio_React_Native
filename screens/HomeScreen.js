import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('XD');
    alert('XD');
  });

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