import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import HomeBtn from '../components/HomeBtn';
import TypeBtn from '../components/TypeBtn';


export default function DatabaseModeSettings({ route, navigation }) {

    const { mode } = route.params || { mode: 'database' }; 

    return(
        <Background>
            <View style={styles.container}>
                <Text style={styles.label_types_text}>Choose the questions types:</Text>

                <View style={styles.type_panel_container}>
                    <View style={styles.type_panel_row}>
                        <TypeBtn id={1} text={'AI'}/>
                        <TypeBtn id={2} text={'Science'}/>
                        <TypeBtn id={3} text={'History'}/>
                    </View>

                    <View style={styles.type_panel_row}>
                        <TypeBtn id={4} text={'Geo'}/>
                        <TypeBtn id={5} text={'Sports'}/>
                        <TypeBtn id={6} text={'Arts'}/>
                    </View>
                </View>

                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <HomeBtn text={'Play'} onPress={() => navigation.navigate('Question', { mode: 'database' })}/>

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
      label_types_text: {
        fontFamily:'rocket_racoon',
        color:'yellow',
        textAlign:'left',
        fontSize:30

      },
      type_panel_container: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
      },
      type_panel_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
})