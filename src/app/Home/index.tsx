import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { styles } from './styles';

export default function Home() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Página Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
