import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background';
import HomeBtn from '../components/HomeBtn';
import TypeBtn from '../components/TypeBtn';


export default function DatabaseModeSettings({ navigation }) {

    const [selectedButtons, setSelectedButtons] = useState([]);

    useEffect(() => {
        async function loadFromStorage() {
          try {
            const storedValue = await AsyncStorage.getItem('@selectedButtons');
            if (storedValue !== null) {
              setSelectedButtons(JSON.parse(storedValue));
            }
          } catch (error) {
            console.log('Erro ao carregar dados do AsyncStorage:', error);
          }
        }
        loadFromStorage();
      }, []);
    
      // Função que marca/desmarca botões e salva a nova lista no AsyncStorage
      const handleButtonPress = async (id) => {
        try {
          // Se já estiver selecionado, remove. Senão, adiciona.
          let newSelected;
          if (selectedButtons.includes(id)) {
            newSelected = selectedButtons.filter(item => item !== id);
          } else {
            newSelected = [...selectedButtons, id];
          }
          setSelectedButtons(newSelected);
    
          // 2) Salvar no AsyncStorage sempre que mudar
          await AsyncStorage.setItem('@selectedButtons', JSON.stringify(newSelected));
        } catch (error) {
          console.log('Erro ao salvar no AsyncStorage:', error);
        }
      };

    return(
        <Background>
            <View style={styles.container}>
                <Text style={styles.label_types_text}>Choose the questions types:</Text>

                <View style={styles.type_panel_container}>
                    <View style={styles.type_panel_row}>
                        <TypeBtn id={1} text={'AI'} onPress={() => handleButtonPress(1)} isSelected={selectedButtons.includes(1)}/>
                        <TypeBtn id={2} text={'Science'} onPress={() => handleButtonPress(2)} isSelected={selectedButtons.includes(2)}/>
                        <TypeBtn id={3} text={'History'} onPress={() => handleButtonPress(3)} isSelected={selectedButtons.includes(3)}/>
                    </View>

                    <View style={styles.type_panel_row}>
                        <TypeBtn id={4} text={'Geo'} onPress={() => handleButtonPress(4)} isSelected={selectedButtons.includes(4)}/>
                        <TypeBtn id={5} text={'Sports'} onPress={() => handleButtonPress(5)} isSelected={selectedButtons.includes(5)}/>
                        <TypeBtn id={6} text={'Arts'} onPress={() => handleButtonPress(6)} isSelected={selectedButtons.includes(6)}/>
                    </View>
                </View>

                <HomeBtn 
                  text={'Play'} 
                  onPress={() => navigation.navigate('Question', { mode: 'database' })}
                  disabled={selectedButtons.length === 0}  
                />

            </View>
        </Background>
        
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap:20
    },

    label_types_text: {
        fontFamily:'rocket_racoon',
        color:'yellow',
        textAlign:'left',
        fontSize:30
    },

    type_panel_container: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
    },
    
    type_panel_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})