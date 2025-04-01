import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import LottieView from 'lottie-react-native';

export interface ScoreProps {
  score: number;
  questionId: string | number; 
  onTimeOut: () => void;  // timer zero => erro
  errorsCount: number;    // quantos ícones devem ficar vermelhos
}

export default function Score({ score, questionId, onTimeOut, errorsCount }: ScoreProps) {
  const [countdown, setCountdown] = useState(30);

  // Reinicia timer a cada questionId
  useEffect(() => {
    setCountdown(30);
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            onTimeOut?.();
          }, 0);
          return 0;
        }
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [questionId, onTimeOut]);

  // Array de 3 índices p/ desenhar ícones
  const errorIcons = [0, 1, 2].map((iconIndex) => {
    // Se "iconIndex < errorsCount", pinta de vermelho; senão, cinza
    const tintColor = iconIndex < errorsCount ? 'red' : undefined;

    return (
      <Image
        key={iconIndex}
        source={require("../assets/icons/error-gray.png")}
        style={[styles.error_icon_image, tintColor ? { tintColor } : null]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {/* bloco branco à esquerda */}
      <View style={styles.info_container}>
        <View style={styles.timer_icon_container}>
          <LottieView
            source={require("../assets/animations/hourglass.json")}
            autoPlay
            loop
            style={styles.timer_animation}
          />
        </View>

        <View style={styles.countdown_text_container}>
          <Text style={styles.countdown_text}>{countdown}</Text>
        </View>

        <View style={styles.error_icon_container}>
          {errorIcons}
        </View>
      </View>

      {/* bloco cinza à direita */}
      <View style={styles.score_container}>
        <View>
          <Text style={styles.score_text}>{score}</Text>
        </View>

        <View style={styles.score_icon_container}>
          <Image
            source={require("../assets/icons/trophy.png")}
            style={styles.score_icon_image}
          />
        </View>
      </View>
    </View>
  );
}

// ################# STYLES #################

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "black",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    minWidth: "100%",
    justifyContent: "space-between",
  },
  info_container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 10,
    borderWidth: 3,
    height: 30,
    borderColor: "black",
  },
  score_container: {
    backgroundColor: "gray",
    borderWidth: 3,
    borderRadius: 10,
    height: 30,
    top: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 10,
  },
  score_text: {
    textAlign: "right",
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  score_icon_container: {
    backgroundColor: "grey",
    borderRadius: 30,
    width: 45,
    borderColor: "black",
    borderWidth: 3,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    left: 5,
  },
  score_icon_image: {
    width: 33,
    height: 33,
  },
  error_icon_image: {
    width: 20,
    height: 20,
    margin: 2,
  },
  timer_icon_container: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    right: 6,
  },
  error_icon_container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  timer_animation: {
    width: 40,
    height: 40,
  },
  countdown_text_container: {
    backgroundColor: "transparent",
    height: 25,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 3,
    borderRightColor: "black",
    marginRight: 5,
  },
  countdown_text: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    textAlign: "center",
  },
});
