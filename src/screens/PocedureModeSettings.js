import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import HomeBtn from "../components/HomeBtn";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ProcedureModeSetings( {navigation}) {

    const [lang_text, set_lang_text] = useState("en");
    const [type_text, set_type_text] = useState("variety");

    useEffect(() => {
        async function loadCache() {
            try {
                const cachedLang = await AsyncStorage.getItem('@proceduralLanguage');
                const cachedType = await AsyncStorage.getItem('@proceduralType');

                if (cachedLang) set_lang_text(cachedLang);
                if (cachedType) set_type_text(cachedType);
            } catch (error) {
                console.log("Erro ao carregar cache:", error);
            }
        }
        loadCache();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('@lang_text', lang_text).catch(err => console.log("Erro ao salvar lang:", err));
        AsyncStorage.setItem('@type_text', type_text).catch(err => console.log("Erro ao salvar type:", err));
    }, [lang_text, type_text]);

    return(

        <Background>
            <View style={styles.container}>
                <Text style={styles.title_text}>Procedural Mode Configuration</Text>
                <View style={styles.type_panel_container}>

                    <Text style={styles.labels_text}>Language:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui..."
                        placeholderTextColor="gray"
                        value={lang_text}
                        onChangeText={set_lang_text}
                    />

                    <View style={{height:20}}/>

                    <Text style={styles.labels_text}>Type:</Text>
                    <TextInput
                            style={styles.input}
                            placeholder="Digite aqui..."
                            placeholderTextColor="gray"
                            value={type_text}
                            onChangeText={set_type_text}
                    />
                </View>

                <HomeBtn 
                    text={'Play'} 
                    onPress={async () => {
                        try {
                            await AsyncStorage.setItem('@proceduralLanguage', lang_text);
                            await AsyncStorage.setItem('@proceduralType', type_text);
                            navigation.navigate('Question', { mode: 'procedural' });
                        } catch (error) {
                            console.log("Erro ao salvar na cache antes de navegar:", error);
                        }
                    }}
                />
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap:20
    },

    title_text: {
        fontSize: 30,
        color: 'yellow',
        fontFamily: 'rocket_racoon',
        alignContent:'center',
        textAlign:'center',
    },

    type_panel_container: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
    },

    labels_text: {
        fontSize: 25,
        color: 'yellow',
        fontFamily: 'rocket_racoon',
    },

    input: {
        backgroundColor: "white",
        width: 250,
        height: 50,
        alignContent:'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        margin: 5,
    },

})