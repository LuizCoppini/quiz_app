import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import Background from '../components/Background';
import Questions from '../components/Questions';
import LogoName from '../components/LogoName';
import { fetchRandomQuestion, fetchProceduralQuestion } from '../services/QuizServices';
import Score from '../components/score';

export default function Question({ route }) {
  const { mode } = route.params || { mode: 'database' }; 
  // se não vier nada, assumimos 'database'
  
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadDatabaseQuestion() {
    try {
      setLoading(true);
      const fetchedQuestion = await fetchRandomQuestion(
        101,
        ['artificial_intelligence','history','science'],
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
  }, [mode]);

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
            {/* Pode mostrar um texto de erro / retry */}
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
    gap:20
  }
});
