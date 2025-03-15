
import { View } from "react-native";
import QuestionsModel from "../data/models/QuestionModel";
import Statement from "./Statement";
import Options from "./Options";


export interface QuestionsProps{
    question: QuestionsModel
}


export default function Questions(props: QuestionsProps){

    return(
        <View>
            <Statement statement={props.question.enunciado}></Statement>
            <View>
                {props.question.opcoes.map((opcao, indice) => (
                    <Options key={indice} index={indice} text={opcao} onPress={() =>{}} />
                ))}
            </View>
            
        </View>
    )

}