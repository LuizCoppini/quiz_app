import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export interface TypeBtnProps {
    id: number,
    text: string
}

export default function TypeBtn(props: TypeBtnProps) {

    const images: { [key: number]: any } = {
        1: require('../assets/icons/ai.png'),
        2: require('../assets/icons/science.png'), // Corrigido "sciense" para "science"
        3: require('../assets/icons/history.png'),
        4: require('../assets/icons/geography.png'),
        5: require('../assets/icons/sports.png'),
        6: require('../assets/icons/arts.png'),
    };

    // Se o ID não estiver mapeado, usar um ícone padrão
    const selectedImage = images[props.id] || require('../assets/icons/geography.png');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn_container}>
                <Image source={selectedImage} style={styles.icon_image} />
                <Text style={styles.text_types}>{props.text}</Text>
        </TouchableOpacity> 
        </View>
        
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 5,
        margin: 5,
    },
    btn_container:{
        alignItems: 'center',
        width: 65,
        height: 65,
        padding: 5,
    },
    icon_image: {
        width: 33,
        height: 33,
        top: 2,
    },
    text_types: {
        fontSize: 13,
        top: 5,
        textAlign: 'center',
    }
})