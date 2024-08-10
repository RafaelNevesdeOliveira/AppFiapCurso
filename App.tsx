import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/app/Home";
import Geolocation from "./src/app/Geolocation";

export default function App() {
  const StackNavigation = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StackNavigation.Navigator>
        <StackNavigation.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            title: "Tela Inicial",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#FFF",
          }}
        />
        <StackNavigation.Screen
          name="Geolocation"
          component={Geolocation}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#FFF",
          }}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
