import { StyleSheet, TouchableOpacity, Text } from "react-native";



export interface HomeBtnProps {

    text: string,
    onPress:() => void

} 


export default function HomeBtn(props: HomeBtnProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        width:'70%',
        padding: 10,

    },
    text:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'Fungames',
    }
});