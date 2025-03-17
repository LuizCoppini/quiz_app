import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import Background from '../components/Background';
import Questions from '../components/Questions';
import LogoName from '../components/LogoName';
import { fetchRandomQuestion, fetchProceduralQuestion } from '../services/QuizServices';

export default function Home() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- Mover a função para cá, no escopo do componente ----
  async function loadQuestion() {
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

  // Chama uma vez ao montar (useEffect com array vazio)
  useEffect(() => {loadQuestion();}, []);

  if (loading) {
    return (
      <Background>
        <View style={styles.container}>
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
        <LogoName />
        <Questions question={question} />
        {/* Adicione um título para o botão */}
        <Button title="Carregar outra questão" onPress={loadQuestion} />
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
