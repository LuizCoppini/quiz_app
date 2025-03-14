import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/background_app.jpg')}
      style={styles.background}
      resizeMode="cover" // Ajusta a imagem ao tamanho da tela
    >
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Para garantir visibilidade na imagem
  },
});
