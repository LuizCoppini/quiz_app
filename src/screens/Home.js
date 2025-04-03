import React from 'react';
import { View, StyleSheet } from 'react-native';
import Background from '../components/Background';
import LogoName from '../components/LogoName';
import HomeBtn from '../components/HomeBtn';
import { StatusBar } from "react-native";

export default function Home({ navigation }) {
  return (

    <Background>
      {/* Define a StatusBar transparente */}
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
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
