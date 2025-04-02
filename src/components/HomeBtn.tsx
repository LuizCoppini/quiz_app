import { StyleSheet, TouchableOpacity, Text } from "react-native";



export interface HomeBtnProps {

    text: string,
    onPress:() => void

} 


export default function HomeBtn(props: HomeBtnProps) {
    return (
        <TouchableOpacity style={styles.backbutton}>
            <TouchableOpacity onPress={props.onPress} style={styles.container}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    backbutton: {
        backgroundColor: 'black',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        width: 250,
        height: 60,

    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems:'center',
        width: 245,
        padding: 10,
        height: 55,

    },
    text:{
        fontSize: 25,
        color: 'black',
        fontFamily: 'fungames',
    }
});