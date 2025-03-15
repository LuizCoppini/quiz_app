import { Pressable, StyleSheet, Text } from "react-native"

export interface OptionsProps{

    index: number,
    text: string,
    onPress:() => void

}

export default function Options(props: OptionsProps){

    return(
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
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