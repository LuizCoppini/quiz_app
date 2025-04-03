import { StyleSheet, Text, View, Image } from "react-native";


export interface StatementProps {
    statement: string,
    type: string,
    level: string

}

export default function Statement(props: StatementProps) {

    const images = {
        1: require('../assets/icons/low-level.png'),
        2: require('../assets/icons/medium-level.png'),
        3: require('../assets/icons/high-level.png'),
      };
    
    let selectedImage = [];
    let text_leve =''

    if(props.level === 'low'){
        selectedImage = images[1];
        text_leve = 'Low';
    } else if(props.level === 'medium'){
        selectedImage = images[2];
        text_leve = 'Medium';
    }
    else { 
        selectedImage = images[3];
        text_leve = 'Hard';
    }

    let text_type = ''

    if (props.type === 'artificial_intelligence') {
        text_type = 'Artificial Intelligence'
    } 
    else if (props.type === 'science') {
        text_type = 'Science'
    }
    else if (props.type === 'history') {
        text_type = 'History'
    }
    else if (props.type === 'geography') {
        text_type = 'Geography'
    }
    else if (props.type === 'sports') {
        text_type = 'Sports'
    }
    else if (props.type === 'arts') {
        text_type = 'Arts'
    }
    else {
        text_type = props.type
    }


    return (
        <View>
            <View style={styles.type}>
                <Text style={styles.label_level_text}>{text_leve}</Text>
                <Image source={selectedImage} style={styles.icon} />
                <Text style={styles.label_type_text}>{text_type}</Text>
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
    label_type_text: {
        color: 'black',
        fontWeight:'bold',
        paddingRight: 5,
    },
    label_level_text: {
        color: 'black',
        fontWeight:'bold',
        paddingLeft: 5,
        paddingRight: 3,
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