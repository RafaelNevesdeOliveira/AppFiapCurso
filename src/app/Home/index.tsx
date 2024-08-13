import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, ListRenderItem, TextInput, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { fetchCars, addCar, updateCar, deleteCar } from '../service/carService';
import { Car } from '../../../assets/data/carData';
import { styles } from './styles';

export default function Home() {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCar, setCurrentCar] = useState<Partial<Car>>({});
  const [carIdToUpdate, setCarIdToUpdate] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCars = async () => {
      const cars = await fetchCars();
      setData(cars);
    };
    loadCars();
  }, []);

    // Função para realizar o logout e redirecionar para a tela de login
    const handleLogout = async () => {
      await signOut(auth); // Realiza o logout usando Firebase Authentication
      navigation.navigate('Login'); // Redireciona para a tela de login
    };
  

  // Função para navegar para a tela de geolocalização
  const handleGoToGeolocation = () => {
    navigation.navigate('Geolocation'); // Navega para a tela de Geolocalização
  };

  // Função para iniciar o processo de adição de um novo carro
  const handleAddCar = () => {
    setIsAdding(true); // Ativa o modo de adição de carro
    setCurrentCar({}); // Limpa o estado do carro atual
  };

  // Função para salvar o carro (seja adicionando um novo ou atualizando um existente)
  const handleSaveCar = async () => {
    if (isAdding) {
      // Se estivermos adicionando um novo carro
      const newCar: Partial<Car> = {
        name: currentCar.name!, // Obtém o nome do carro do estado
        year: currentCar.year!, // Obtém o ano do carro do estado
        image: currentCar.image!, // Obtém a URL da imagem do estado
      };
      await addCar(newCar); // Adiciona o novo carro no Firestore
    } else if (isUpdating && carIdToUpdate) {
      // Se estivermos atualizando um carro existente
      const updatedCar: Partial<Car> = {
        name: currentCar.name,
        year: currentCar.year,
        image: currentCar.image,
      };
      await updateCar(carIdToUpdate, updatedCar); // Atualiza o carro existente no Firestore
    }
    // Reseta os estados e recarrega a lista de carros
    setIsAdding(false);
    setIsUpdating(false);
    setCurrentCar({});
    setCarIdToUpdate(null);
    setData(await fetchCars()); // Recarrega os dados dos carros
  };

  // Função para preparar o formulário para a atualização de um carro existente
  const handleUpdateCar = (id: string) => {
    const carToEdit = data.find(car => car.id === id); // Encontra o carro a ser editado pelo ID
    if (carToEdit) {
      setCurrentCar(carToEdit); // Preenche o formulário com os dados do carro a ser editado
      setCarIdToUpdate(id); // Armazena o ID do carro a ser atualizado
      setIsUpdating(true); // Ativa o modo de atualização
    }
  };

  // Função para deletar um carro
  const handleDeleteCar = async (id: string) => {
    await deleteCar(id); // Deleta o carro no Firestore pelo ID
    setData(await fetchCars()); // Recarrega os dados dos carros
  };
  
    // Função para renderizar cada item na FlatList (carro)
  const renderItem: ListRenderItem<Car> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image || 'https://example.com/placeholder.png' }}
        style={styles.image}
        onError={() => Alert.alert('Erro ao carregar imagem')}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.year}>{item.year}</Text>
      <Button title="Update" onPress={() => handleUpdateCar(item.id)} />
      <Button title="Delete" onPress={() => handleDeleteCar(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <Button title="Geolocation" onPress={handleGoToGeolocation} />
        <Button title="Logout" onPress={handleLogout} />
      </View>

      {isAdding || isUpdating ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={currentCar.name || ''}
            onChangeText={(text) => setCurrentCar({ ...currentCar, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={currentCar.year ? String(currentCar.year) : ''}
            keyboardType="numeric"
            onChangeText={(text) => setCurrentCar({ ...currentCar, year: parseInt(text) })}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={currentCar.image || ''}
            onChangeText={(text) => setCurrentCar({ ...currentCar, image: text })}
          />
          <Button title="Save" onPress={handleSaveCar} />
          <Button title="Cancel" onPress={() => { setIsAdding(false); setIsUpdating(false); setCurrentCar({}); }} />
        </View>
      ) : (
        <>
          <Button title="Add Car" onPress={handleAddCar} />
          <Text style={styles.sectionTitle}>Carros</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Text>Loading...</Text> : null}
          />
        </>
      )}
    </View>
  );
}
