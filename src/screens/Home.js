import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Background from '../components/Background';

export default function Home() {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={{fontFamily:'fungames', color:'yellow', fontSize:50}}>QuizGenAI</Text>
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
