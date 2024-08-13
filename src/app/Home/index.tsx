import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, ListRenderItem } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { carData, Car } from "../../../assets/data/carData";
import { styles } from './styles';

export default function Home() {
  const [data, setData] = useState<Car[]>(carData.slice(0, 1)); // Inicialmente carrega 3 itens
  const [loading, setLoading] = useState(false);
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

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);
    const newData = carData.slice(data.length, data.length + 1); // Carrega mais 3 itens
    setTimeout(() => { // Simula um tempo de carregamento
      setData([...data, ...newData]);
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <Button title="Geolocation" onPress={handleGoToGeolocation} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Text style={styles.sectionTitle}>Carros</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={1} // deixa 1 coluna para scroll vertical
        onEndReached={loadMoreData} // Chama loadMoreData ao chegar perto do final da listagem
        onEndReachedThreshold={0.5} // Controhomela o quão perto do final da lista o carregamento é disparado (%de altltura que ao ser atingido, quando chegar na metade do visivel)
        ListFooterComponent={loading ? <Text>Loading...</Text> : null} // Exibe um indicador de carregamento no final
      />
    </View>
  );
}
