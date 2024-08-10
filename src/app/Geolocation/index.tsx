import { View, Text, Button } from "react-native";
import { styles } from "./styles";
import { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

function Geolocation() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        route.params?.nome === "" ? "Tela Geolocation" : `Olá ${route.params?.nome}`,
    });
  }, [route.params?.nome, navigation]);

  return (
    <View style={styles.container}>
      <Text>Página Geolocation</Text>
      <Text>{route.params?.nome}</Text>
      <Text>{route.params?.canal}</Text>
      <Button title="Voltar para a Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Geolocation;
