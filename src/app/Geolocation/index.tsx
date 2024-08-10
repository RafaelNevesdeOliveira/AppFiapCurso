import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { styles} from './styles'
import Footer from '../../components/Footer';

const GOOGLE_API_KEY = "AIzaSyCVggpZf_fNjqbQMVIF9rNqsPjGbzEQK48";

export default function LocationScreen() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleGetCurrentLocation = () => {
    console.log(process.env.EXPO_PUBLIC_API_KEY);

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error("Error getting location", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Você está aqui"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Pegar Localização Atual" onPress={handleGetCurrentLocation} />
      </View>
      <Footer navigation={""}/>
    </View>
  );
}


