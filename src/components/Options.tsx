import { Pressable, StyleSheet, Text } from "react-native"

export interface OptionsProps{

    index: number,
    text: string,
    isSelected: boolean;     // se esta opção é a clicada
    answerStatus: string;    // "correct" ou "incorrect"
    onPress: () => void;

}

export default function Options(props: OptionsProps){

    const { text, isSelected, answerStatus, onPress } = props;

    // Define a cor de fundo condicionalmente
    let backgroundColor = '#5555'; // cor default do botão
    if (isSelected) {
        // Se foi clicado, decide cor
        if (answerStatus === 'correct') {
        backgroundColor = 'green';
        } else if (answerStatus === 'incorrect') {
        backgroundColor = 'red';
        }
    }

    return(
        <Pressable style={[styles.container, {backgroundColor}]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5555',
        margin:5,
        padding: 15,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20,

    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'

    }
})