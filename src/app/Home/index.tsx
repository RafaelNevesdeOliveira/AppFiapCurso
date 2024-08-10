import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { useState } from "react";

function Home() {
  const [nome, setNome] = useState("Felipe");
  const [canal, setCanal] = useState("TecEdu4All");
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate("Geolocation", { nome, canal});
  }

  return (
    <View style={styles.container}>
      <Text>Página Home</Text>
      <Button title="Navegar para a tela Geolocation" onPress={handlePress} />
    </View>
  );
}

export default Home;
