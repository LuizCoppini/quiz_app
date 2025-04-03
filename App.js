import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync(); // Impede que a splash feche automaticamente

export default function App() {
  const [fontsLoaded] = useFonts({
    'Yang Bung font': require('./src/assets/fonts/tittle_font.otf'),
    'rocket_racoon': require('./src/assets/fonts/RocketRaccoon.otf'),
    'dantene': require('./src/assets/fonts/Dantene.otf'),
    'fungames': require('./src/assets/fonts/Fungames.otf'),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }
    prepareApp();
  }, [fontsLoaded]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="yellow"/>
      </View>
    );
  }

  return <AppNavigator />;
}
