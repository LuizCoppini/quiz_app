
//import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image } from "react-native";



export interface StatementProps {
    statement: string,
    type: string,
    level: string

}


export default function Statement(props: StatementProps) {

    return (
        <View>
            <View style={styles.type}>
                <Image source={require("../assets/icons/high-level.png")} style={styles.icon} />
                <Text style={styles.label_text}>Artificial Intelligence</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.questions_text}>{props.statement}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    type:{
        backgroundColor:'#f4f75c',
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        padding:5,
        top:6,
        alignItems:'center',
        alignSelf:'center',
        fontSize:15,
        fontStyle:'italic',
        fontWeight:'bold',
        flexDirection:'row',
        
    },
    container: {
        backgroundColor: '#edf065',
        borderRadius: 10,
        borderColor:'black',
        borderWidth: 3,
        alignSelf:'center',
        width: '95%',
        padding: 10,
        marginRight:20,
        marginLeft:20,
        marginBottom:20,
        marginHorizontal:20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    questions_text: {
        color: 'black',
        fontSize: 23,
        opacity: 0.8,
        textAlign: 'center',
        fontWeight:'bold'
    },
    label_text: {
        color: 'black',
        fontWeight:'bold',
        paddingRight:10,
    },
    icon: {
        width: 25,
        height: 25,
        alignSelf: 'center',
        alignItems:'center',
        marginRight: 10,
        paddingRight:10
    },
    background:{
        position:'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

})