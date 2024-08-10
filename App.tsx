import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/app/Home';
import Geolocation from './src/app/Geolocation';
import Login from './src/app/Login';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
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
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
