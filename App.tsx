import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';  // Importa o Provider do react-redux
import { store } from './src/utils/store';  // Importa a store configurada
import Home from './src/app/Home';
import Geolocation from './src/app/Geolocation';
import Login from './src/app/Login';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import RegisterUser from './src/app/Register/index';  // Corrigido o caminho para RegisterUser

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation.Navigator initialRouteName="Login">
          <StackNavigation.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}
          />
          <StackNavigation.Screen 
            name="Home" 
            component={Home} 
            options={({ navigation }) => ({
              footer: () => <Footer navigation={navigation} />,
            })}
          />
          <StackNavigation.Screen 
            name="Geolocation" 
            component={Geolocation} 
            options={({ navigation }) => ({
              header: () => <Header title="Geolocation" onMenuPress={() => {}} canGoBack={navigation.canGoBack()} />,
              footer: () => <Footer navigation={navigation} />,
            })}
          />
          <StackNavigation.Screen 
            name="RegisterUser" 
            component={RegisterUser} 
            options={({ navigation }) => ({
              header: () => <Header title="RegisterUser" onMenuPress={() => {}} canGoBack={navigation.canGoBack()} />,
              footer: () => <Footer navigation={navigation} />,
            })}
          />
        </StackNavigation.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
