import React from 'react';
import { View, Text, StatusBar, StyleSheet, Button } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/logo';

export default function Home() {
  return (
    <Background>
      <View style={styles.container}>
        <Logo />
        <StatusBar style="auto" />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
