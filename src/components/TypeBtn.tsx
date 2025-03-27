import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TypeBtn({ id, text, onPress, isSelected }) {
  const images = {
    1: require('../assets/icons/ai.png'),
    2: require('../assets/icons/science.png'),
    3: require('../assets/icons/history.png'),
    4: require('../assets/icons/geography.png'),
    5: require('../assets/icons/sports.png'),
    6: require('../assets/icons/arts.png'),
  };
  const selectedImage = images[id] || require('../assets/icons/geography.png');

  const borderColor = isSelected ? 'green' : 'white';

  return (
    <View style={[styles.container, { borderColor }]}>
      <TouchableOpacity style={styles.btn_container} onPress={onPress}>
        <Image source={selectedImage} style={styles.icon_image} />
        <Text style={styles.text_types}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 5,
    margin: 5,
  },

  btn_container: {
    alignItems: 'center',
    width: 65,
    height: 65,
    padding: 5,
  },

  icon_image: {
    width: 33,
    height: 33,
    top: 2,
  },

  text_types: {
    fontSize: 13,
    top: 5,
    textAlign: 'center',
  }
  
});
