import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import Background from '../components/Background';
import Questions from '../components/Questions';
import LogoName from '../components/LogoName';
import { fetchRandomQuestion, fetchProceduralQuestion } from '../services/QuizServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Score from '../components/score';

export default function Question({ route }) {
  const { mode } = route.params || { mode: 'database' };

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Este estado guardará o array final de temas (strings)
  const [selectedThemes, setSelectedThemes] = useState([]);

  // mapeie os IDs de botões para o tema que você passa para o serviço
  const THEME_MAP = {
    1: 'artificial_intelligence',
    2: 'science',
    3: 'history',
    4: 'geography',
    5: 'sports',
    6: 'varieties'
  };

  useEffect(() => {
    async function loadFromStorage() {
      try {
        const storedValue = await AsyncStorage.getItem('@selectedButtons'); // contém array de IDs
        if (storedValue !== null) {
          const selectedIds = JSON.parse(storedValue);
          const mappedThemes = selectedIds.map((id) => THEME_MAP[id]);
          setSelectedThemes(mappedThemes);
        } else {
          // Caso não exista nada salvo, pode definir um padrão ou deixar array vazio
          setSelectedThemes([]);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error);
      }
    }
    loadFromStorage();
  }, []);

  // Função para carregar questão do banco
  async function loadDatabaseQuestion() {
    try {
      setLoading(true);

      const fetchedQuestion = await fetchRandomQuestion(
        Math.floor(Math.random() * 150) + 1, // ID aleatório entre 1 e 150
        selectedThemes.length > 0 ? selectedThemes : ['artificial_intelligence','history','science'], 
        'en'
      );
      setQuestion(fetchedQuestion);
    } catch (error) {
      Alert.alert("Erro ao buscar questão", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadProceduralQuestion() {
    try {
      setLoading(true);
      const fetchedQuestion = await fetchProceduralQuestion('science','en');
      setQuestion(fetchedQuestion);
    } catch (error) {
      Alert.alert("Erro ao buscar questão", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mode === 'procedural') {
      loadProceduralQuestion();
    } else {
      loadDatabaseQuestion();
    }
  }, [mode, selectedThemes]); 

  if (loading) {
    return (
      <Background>
        <View style={styles.container}>
          <Score />
          <LogoName />
          <ActivityIndicator size="large" color="yellow" />
        </View>
      </Background>
    );
  }

  if (!question) {
    return (
      <Background>
        <View style={styles.container}>
          <LogoName />
          <View>
            {/* Pode mostrar um texto de erro ou um botão de retry aqui */}
          </View>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <View style={styles.container}>
        <Score />
        <LogoName />
        <Questions question={question} />
        <Button title="Recarregar Database" onPress={loadDatabaseQuestion} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  }
});
