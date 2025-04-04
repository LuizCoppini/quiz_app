import { View, Text, StyleSheet } from "react-native";


export default function LogoName(){
    return(
        <View style={styles.container}>
            <Text style={styles.primary}>QuizGenAI:</Text>
            <Text style={styles.secundary}>Only aswer the questions</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "transparent"
    },

    primary:{
        fontFamily:'fungames',
        color:'yellow',
        textAlign:'left',
        fontSize:45
    },

    secundary:{
        fontFamily:'rocket_racoon',
        color:'yellow',
        textAlign:'left',
        fontSize:30
    },

})
