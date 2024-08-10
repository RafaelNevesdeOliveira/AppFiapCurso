import React from 'react';
import { View, Text, Button, FlatList, Image, ListRenderItem } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { carData, Car } from "../../../assets/data/carData";
import { styles } from './styles';
export default function Home() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  const handleGoToGeolocation = () => {
    navigation.navigate('Geolocation');
  };

  const renderItem: ListRenderItem<Car> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <Button title="Geolocation" onPress={handleGoToGeolocation} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Text style={styles.sectionTitle}>Carros</Text>
      <FlatList
        data={carData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
