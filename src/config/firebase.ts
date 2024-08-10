import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChjnWrtanuh1nO9Dk1Dog8-eTArEzWCgI",
  authDomain: "appfiap-86e90.firebaseapp.com",
  projectId: "appfiap-86e90",
  storageBucket: "appfiap-86e90.appspot.com",
  messagingSenderId: "884797427327",
  appId: "1:884797427327:ios:6718b2bf80f9b68d77794a",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
