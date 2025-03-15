
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";



export interface StatementProps {
    statement: string

}


export default function Statement(props: StatementProps) {

    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.background} />
            <Text style={styles.text}>{props.statement}</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'yellow',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        margin:20,
        marginHorizontal:20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        color: 'black',
        fontSize: 23,
        opacity: 0.8,
        textAlign: 'center',
        fontWeight:'bold'
    },
    background:{
        position:'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

})