import { useEffect, useState } from 'react';
import { View } from "react-native";
import Statement from "./Statement";
import Options from "./Options";

export default function Questions(props) {
  const { question, onOptionPress, selectedOption, answerStatus } = props;

  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Toda vez que a pergunta mudar, re-embaralha uma única vez
  useEffect(() => {
    if (question?.opcoes) {
      const newShuffled = [...question.opcoes].sort(() => Math.random() - 0.5);
      setShuffledOptions(newShuffled);
    }
  }, [question]);

  return (
    <View>
      <Statement
        statement={question.enunciado}
        type={question.type}
        level={question.level}
      />
      <View>
        {shuffledOptions.map((opcao, indice) => (
          <Options
            key={indice}
            index={indice}
            text={opcao}
            onPress={() => onOptionPress(opcao)}
            isSelected={opcao === selectedOption}
            answerStatus={answerStatus}
          />
        ))}
      </View>
    </View>
  );
}
