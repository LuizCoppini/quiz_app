import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import Background from '../components/Background';
import Questions from '../components/Questions';
import LogoName from '../components/LogoName';
import { fetchRandomQuestion, fetchProceduralQuestion } from '../services/QuizServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Score from '../components/Score';

export default function Question({ route }) {
  const { mode } = route.params || { mode: 'database' };

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  // Estados para controlar qual opção foi selecionada e se está correta
  const [selectedOption, setSelectedOption] = useState("");
  const [answerStatus, setAnswerStatus] = useState(""); // "correct" ou "incorrect"
  const [canClick, setCanClick] = useState(true);

  // Este estado guardará o array final de temas (strings)
  const [selectedThemes, setSelectedThemes] = useState([]);

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
        const storedValue = await AsyncStorage.getItem('@selectedButtons'); 
        if (storedValue !== null) {
          const selectedIds = JSON.parse(storedValue);
          const mappedThemes = selectedIds.map((id) => THEME_MAP[id]);
          setSelectedThemes(mappedThemes);
        } else {
          setSelectedThemes([]);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error);
      }
    }
    loadFromStorage();
  }, []);

  async function loadDatabaseQuestion() {
    console.log("Camou");
    try {
      setLoading(true);
      // sempre que buscar uma nova pergunta, limpe o estado de seleção
      setSelectedOption("");
      setAnswerStatus("");

      const fetchedQuestion = await fetchRandomQuestion(
        Math.floor(Math.random() * 150) + 1, 
        selectedThemes.length > 0 ? selectedThemes : ['artificial_intelligence','history','science'], 
        'en'
      );
      fetchedQuestion.id = `q_${Date.now()}_${Math.random()}`;
      console.log("Nova pergunta ID:", fetchedQuestion.id);
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
      setSelectedOption("");
      setAnswerStatus("");

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

  // Verifica acerto e muda cor do botão
  const handleOptionPress = (opcaoSelecionada) => {
    if (!question) return;
    if (!canClick) return;
  
    setCanClick(false);
    setSelectedOption(opcaoSelecionada);
  
    if (opcaoSelecionada === question.respostaCorreta) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
  
    setTimeout(() => {
      loadDatabaseQuestion();
      setCanClick(true);
    }, 2000);
  };




  if (loading) {
    return (
      <Background>
        <View style={styles.container}>
          <Score
            score={score}
            questionId={question?.id} // Identificador único da pergunta atual
            onTimeOut={() => {loadDatabaseQuestion();}}
          />
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
        <Score score={score} />
        <LogoName />

        {/*
          Passamos para <Questions>:
            1) a pergunta
            2) a função de clique (handleOptionPress)
            3) selectedOption e answerStatus p/ saber qual botão está colorido
        */}
        <Questions
          question={question}
          onOptionPress={handleOptionPress}
          selectedOption={selectedOption}
          answerStatus={answerStatus}
        />

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