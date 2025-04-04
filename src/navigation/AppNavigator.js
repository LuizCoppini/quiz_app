import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe suas telas
import Home from '../screens/Home';
import Question from '../screens/Question';
import DatabaseModeSettings from '../screens/DatabaseModeSettings';
import ProcedureModeSetings from '../screens/PocedureModeSettings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >


        {/* Tela Inicial */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} // se quiser ocultar a toolbar
        />

        {/* Tela de Perguntas */}
        <Stack.Screen 
          name="Question" 
          component={Question}
          options={{ headerShown: false }}
        />

        {/* Tela de Configurações do modo Database*/}
        <Stack.Screen 
          name="DatabaseModeSettings" 
          component={DatabaseModeSettings}
          options={{ headerShown: false }}
        />

        {/* Tela de Configurações do modo Procedure*/}
        <Stack.Screen 
        name="ProcedureModeSettings"
        component={ProcedureModeSetings}
        options={{ headerShown: false }}
        />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default AppNavigator;
