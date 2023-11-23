import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// $ expo install expo-location
// $ npm install -s expo-location

const MapScreen = ({ }) => {
  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: -12.0464,
    longitude: -77.0428,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords);
      setLocation(location);
      let newInitialRegion = {
        latitude: -12.0464,
        longitude: -77.0428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/*
      <Text>Map Screen</Text>
      {location ? (
        <Text>
          Ubicación actual: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      ) : (
        <Text>Cargando ubicación...</Text>
      )}
      */}
      <MapView 
        style={styles.map}
        initialRegion={initialRegion}>
        {location ? 
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Marker Title"
            description="Marker Description" />
        : <></>}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;