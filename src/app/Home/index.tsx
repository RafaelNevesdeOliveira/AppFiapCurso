import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, ListRenderItem, TextInput, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { fetchCars, addCar, updateCar, deleteCar } from '../service/carService';
import { Car } from '../../../assets/data/carData';
import { styles } from './styles';
import Footer from '../../components/Footer';

export default function Home() {
  // Estado para armazenar a lista de carros
  const [data, setData] = useState<Car[]>([]);

  // Estado para gerenciar o status de carregamento durante operações assíncronas
  const [loading, setLoading] = useState(false);

  // Estado para indicar se estamos no modo de adição de um novo carro
  const [isAdding, setIsAdding] = useState(false);

  // Estado para indicar se estamos no modo de atualização de um carro existente
  const [isUpdating, setIsUpdating] = useState(false);

  // Estado para armazenar os dados do carro que está sendo adicionado ou atualizado
  const [currentCar, setCurrentCar] = useState<Partial<Car>>({});

  // Estado para armazenar o ID do carro que está sendo atualizado
  const [carIdToUpdate, setCarIdToUpdate] = useState<string | null>(null);

  // Hook de navegação do React Navigation
  const navigation = useNavigation();

  // useEffect para carregar os carros ao montar o componente
  useEffect(() => {
    const loadCars = async () => {
      // Busca a lista de carros do serviço e atualiza o estado
      const cars = await fetchCars();
      setData(cars);
    };
    loadCars(); // Chama a função para carregar os carros
  }, []); // O array vazio [] significa que este efeito só será executado uma vez, quando o componente for montado

  // Função para iniciar o processo de adição de um novo carro
  const handleAddCar = () => {
    setIsAdding(true); // Ativa o modo de adição
    setCurrentCar({}); // Limpa o estado do carro atual
  };

  // Função para salvar um carro (novo ou atualizado)
  const handleSaveCar = async () => {
    if (isAdding) {
      // Se estivermos no modo de adição
      const newCar: Partial<Car> = {
        name: currentCar.name!, // Nome do carro a partir do estado
        year: currentCar.year!, // Ano do carro a partir do estado
        image: currentCar.image!, // URL da imagem do carro a partir do estado
      };
      await addCar(newCar); // Adiciona o novo carro ao banco de dados
    } else if (isUpdating && carIdToUpdate) {
      // Se estivermos no modo de atualização e um ID de carro foi definido
      const updatedCar: Partial<Car> = {
        name: currentCar.name,
        year: currentCar.year,
        image: currentCar.image,
      };
      await updateCar(carIdToUpdate, updatedCar); // Atualiza o carro existente no banco de dados
    }
    // Reseta os estados e recarrega a lista de carros
    setIsAdding(false);
    setIsUpdating(false);
    setCurrentCar({});
    setCarIdToUpdate(null);
    setData(await fetchCars()); // Recarrega os dados dos carros após a operação
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
    await deleteCar(id); // Deleta o carro do banco de dados
    setData(await fetchCars()); // Recarrega a lista de carros após a exclusão
  };

  // Função para renderizar cada item na lista de carros (FlatList)
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
      <View style={styles.wrapp}>
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
      <Footer />
    </View>
  );
}
