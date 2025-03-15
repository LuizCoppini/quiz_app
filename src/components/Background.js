import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background_app.jpg')}
        style={styles.image}
        resizeMode="cover"
        imageStyle={{opacity:0.5}}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
});
