// App.js
import React, { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Home from './src/screens/Home';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Impede que a splash screen feche antes de carregarmos a fonte
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Carregue a(s) fonte(s) que você precisa
  const [fontsLoaded] = useFonts({
    'Yang Bung font': require('./src/assets/fonts/tittle_font.otf'),
    'rocket_racoon': require('./src/assets/fonts/RocketRaccoon.otf'),
    'dantene': require('./src/assets/fonts/Dantene.otf'),
    'fungames': require('./src/assets/fonts/Fungames.otf'),
    // Adicione mais fontes se quiser
  });

  // Quando as fontes estiverem prontas, esconda a splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Enquanto as fontes não carregaram, você pode retornar algo simples, tipo um loader
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Assim que as fontes estiverem carregadas, renderize sua tela principal
  return <Home onLayout={onLayoutRootView} />;
}
