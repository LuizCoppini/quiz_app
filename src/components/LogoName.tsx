import { View, Text, StyleSheet } from "react-native";


export default function LogoName(){
    return(
        <View>
            <Text style={style.primary}>QuizGenAI:</Text>
            <Text style={style.secundary}>Only aswer the questions</Text>
        </View>
    )

}

const style = StyleSheet.create({

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
    }

})
