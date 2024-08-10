import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Container, FooterButton, FooterText } from './styles';

export default function Footer(){
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToGeolocation = () => {
    navigation.navigate('Geolocation');
  };

  return (
    <Container>
      <FooterButton onPress={handleNavigateToHome}>
        <Ionicons name="home" size={24} color="white" />
        <FooterText>Home</FooterText>
      </FooterButton>
      <FooterButton onPress={handleNavigateToGeolocation}>
        <Ionicons name="navigate" size={24} color="white" />
        <FooterText>Geolocation</FooterText>
      </FooterButton>
      <FooterButton onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="white" />
        <FooterText>Logout</FooterText>
      </FooterButton>
    </Container>
  );
};
