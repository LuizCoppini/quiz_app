import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Background from '../components/Background';
import LogoName from '../components/LogoName';
import HomeBtn from '../components/HomeBtn';

export default function Home({ navigation }) {
  return (
    <Background>
      <View style={styles.container}>

        <LogoName />

        <HomeBtn text={'Database'} onPress={() => navigation.navigate('DatabaseModeSettings', { mode: 'database' })}/>
        <HomeBtn text={'Procedural'} onPress={() => navigation.navigate('Question', { mode: 'procedural' })}/>

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
  }
});
