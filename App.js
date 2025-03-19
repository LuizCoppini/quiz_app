import React, { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Importe o seu AppNavigator
import AppNavigator from './src/navigation/AppNavigator';

// Impede que a splash screen feche automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Yang Bung font': require('./src/assets/fonts/tittle_font.otf'),
    'rocket_racoon': require('./src/assets/fonts/RocketRaccoon.otf'),
    'dantene': require('./src/assets/fonts/Dantene.otf'),
    'fungames': require('./src/assets/fonts/Fungames.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log("🔹 Fontes carregadas, escondendo Splash Screen...");
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* Em vez de <Home />, renderizamos o AppNavigator */}
      <AppNavigator />
    </View>
  );
}
