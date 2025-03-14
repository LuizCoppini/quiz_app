import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/images/background_app.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
