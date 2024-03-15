import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);
      console.log(initialLocation)
      setMapRegion({
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421
      });
    })();
  }, []);

  const handleRegionChangeComplete = (region) => {
    setMapRegion(region);
    console.log("Updated location:", region);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        region={mapRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {mapRegion && <Marker title='Today' coordinate={mapRegion} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('screen').width * 0.89,
    height: Dimensions.get('screen').height * 0.23,
  },
});
