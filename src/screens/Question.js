import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '../components/Background';
import Questions from '../components/Questions';
import LogoName from '../components/LogoName';
import { fetchRandomQuestion, fetchProceduralQuestion } from '../services/QuizServices';
import Score from '../components/Score';

export default function Question({ route, navigation }) {
  const { mode } = route.params || { mode: 'database' };

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answerStatus, setAnswerStatus] = useState(""); // "correct" ou "incorrect"
  const [canClick, setCanClick] = useState(true);

  // TEMAS
  const [selectedThemes, setSelectedThemes] = useState([]);

  // CONTADOR DE ERROS:
  const [errorsCount, setErrorsCount] = useState(0);

  // Mapeia IDs do AsyncStorage -> string do back-end
  const THEME_MAP = {
    1: 'artificial_intelligence',
    2: 'science',
    3: 'history',
    4: 'geography',
    5: 'sports',
    6: 'varieties'
  };

  // Carrega do AsyncStorage o array de botões selecionados + quantos erros
  useEffect(() => {
    async function loadData() {
      try {
        // Temas
        const storedValue = await AsyncStorage.getItem('@selectedButtons');
        if (storedValue !== null) {
          const selectedIds = JSON.parse(storedValue);
          const mappedThemes = selectedIds.map((id) => THEME_MAP[id]);
          setSelectedThemes(mappedThemes);
        } else {
          setSelectedThemes([]);
        }

        // Erros
        const storedErrors = await AsyncStorage.getItem('@errorsCount');
        if (storedErrors !== null) {
          setErrorsCount(Number(storedErrors));
        }
      } catch (error) {
        console.log('Erro ao carregar do AsyncStorage:', error);
      }
    }
    loadData();
  }, []);

  // Salva errorsCount no AsyncStorage sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem('@errorsCount', String(errorsCount))
      .catch((err) => console.log("Erro ao salvar errosCount:", err));
  }, [errorsCount]);

  // Carrega pergunta do banco
  async function loadDatabaseQuestion() {
    try {
      setLoading(true);
      setSelectedOption("");
      setAnswerStatus("");

      const randomId = Math.floor(Math.random() * 150) + 1;
      const themesToUse = selectedThemes.length > 0
        ? selectedThemes
        : ['artificial_intelligence','history','science'];

      const fetchedQuestion = await fetchRandomQuestion(randomId, themesToUse, 'en');
      // Cria ID único (necessário pra reiniciar timer)
      fetchedQuestion.id = `q_${Date.now()}_${Math.random()}`;
      setQuestion(fetchedQuestion);
    } catch (error) {
      Alert.alert("Erro ao buscar questão", error.message);
    } finally {
      setLoading(false);
    }
  }

  // Carrega pergunta procedural (exemplo)
  async function loadProceduralQuestion() {
    try {
      setLoading(true);
      setSelectedOption("");
      setAnswerStatus("");

      const fetchedQuestion = await fetchProceduralQuestion('science','en');
      // ID pra reiniciar timer
      fetchedQuestion.id = `p_${Date.now()}_${Math.random()}`;
      setQuestion(fetchedQuestion);
    } catch (error) {
      Alert.alert("Erro ao buscar questão", error.message);
    } finally {
      setLoading(false);
    }
  }

  // Decide qual pergunta carregar no início ou quando modo/temas mudam
  useEffect(() => {
    if (mode === 'procedural') {
      loadProceduralQuestion();
    } else {
      loadDatabaseQuestion();
    }
  }, [mode, selectedThemes]);

  // Ao clicar numa opção
  const handleOptionPress = (opcaoSelecionada) => {
    if (!question || !canClick) return;
    setCanClick(false);
    setSelectedOption(opcaoSelecionada);

    if (opcaoSelecionada === question.respostaCorreta) {
      setScore(prev => prev + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
      incrementError(); // CHAVE: incrementa erros
    }

    // Espera 2s e carrega nova pergunta
    setTimeout(() => {
      checkErrorsAndContinue();
      setCanClick(true);
    }, 2000);
  };

  // Timer chegou a zero
  const handleTimeOut = () => {
    setTimeout(() => {
      incrementError(); 
      checkErrorsAndContinue(); 
    }, 0);
  }

  // Incrementa errorsCount em 1
  function incrementError() {
    setErrorsCount(prev => prev + 1);
  }

  // Verifica se chegou em 3 erros, se sim -> outra tela. Se não, carrega pergunta
  function checkErrorsAndContinue() {
    if (errorsCount + 1 >= 3) {
      Alert.alert("Game Over");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      // Pode também zerar errorsCount, ou não, dependendo da sua lógica
      setErrorsCount(0);
    } else {
      // Se ainda não atingiu 3, carrega outra
      if (mode === 'procedural') {
        loadProceduralQuestion();
      } else {
        loadDatabaseQuestion();
      }
    }
  }

  if (loading) {
    return (
      <Background>
        {/* Score Fixo */}
        <Score
          score={score}
          questionId={question?.id} 
          onTimeOut={handleTimeOut}
          errorsCount={errorsCount}
        />
  
        {/* O restante do layout centralizado */}
        <View style={styles.container}>
          <LogoName />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
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
            <Button title="Tentar Novamente" onPress={loadDatabaseQuestion} />
          </View>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <Score
          score={score}
          questionId={question.id}
          onTimeOut={handleTimeOut}
          errorsCount={errorsCount}
        />

      <View style={styles.container}>
        {/* Passamos errorsCount pra Score também no estado normal */}
        
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap:20,
    paddingTop: 40,
    paddingLeft: 5,
    paddingRight: 5,
  },

  loadingContainer: {
    marginTop: 10,
  },

});
