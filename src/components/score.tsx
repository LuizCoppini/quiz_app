import { StyleSheet, Text, View, Image } from "react-native";


export interface ScoreProps {
    score: string,
}


export default function Score() {

    return(
        <View style={styles.container}>
            <View style={styles.score_container}>
                <Text style={styles.score_text}>40</Text>
            </View>
            
            <View style={styles.icon_container}>
                <Image source={require("../assets/icons/trophy.png")} style={styles.icon_image} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor:'transparent',
        borderRadius:10,
        borderColor:'black',
        flexDirection:'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    score_container: {
        backgroundColor:'gray',
        alignItems:'center',
        borderBlockColor:'black',
        borderWidth: 3,
        borderRadius:10,
        height: 30,
        left: 10,
        justifyContent:'center',
        paddingRight: 15,
        paddingLeft: 10,
    },
    score_text: {
        textAlign:'right',
        fontSize: 13,
        color:'white',
        fontWeight:'bold',
    },
    icon_container: {
        backgroundColor:'grey',
        borderRadius:30,
        width: 45,
        borderColor:'black',
        borderWidth: 3,
        height: 45,
        alignItems:'center',
        justifyContent:'center',
    },
    icon_image: {
        width: 33,
        height: 33,
    }

});