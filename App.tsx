import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/app/Home';
import Geolocation from './src/app/Geolocation';
import Login from './src/app/Login';

export default function App() {
  const StackNavigation = createNativeStackNavigator();

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
          options={{ 
            headerShown: true, 
            title: "Tela Inicial", 
            headerStyle: { backgroundColor: '#000' }, 
            headerTintColor: '#FFF' 
          }}
        />
        <StackNavigation.Screen 
          name="Geolocation" 
          component={Geolocation} 
          options={{ headerShown: true }}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
