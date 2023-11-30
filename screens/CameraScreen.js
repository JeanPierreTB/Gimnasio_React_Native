import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CameraScreen = ({ }) => {
  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
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

export default CameraScreen;