import React from 'react';
import { View, StatusBar, StyleSheet, Alert } from 'react-native';
import Background from '../components/Background';
import Questions from '../components/Questions';
import QuestionsItens from '../data/constants/QuestionsConst';
import LogoName from '../components/LogoName';

export default function Home() {


  return (
    <Background>
      <View style={styles.container}>
        <LogoName/>
        <Questions question={QuestionsItens[2]}></Questions>
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
    gap:20
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
