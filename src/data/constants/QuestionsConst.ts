import QuestionsModel from "../models/QuestionModel"


const QuestionsItens: QuestionsModel[] = [
    {
        id: 1,
        enunciado: 'Qual é o maior planeta do sistema solar?',
        opcoes: ['Terra', 'Júpiter', 'Saturno', 'Urano'],
        resposta: 'Júpiter',
        id_resposta: 0,
        level: "",
        type: ""
    },
    {
        id: 2,
        enunciado: 'Quantos planetas existem no sistema solar?',
        opcoes: ['8', '9', '7', '10'],
        resposta: '8',
        id_resposta: 0,
        level: "",
        type: ""
    },
    {
        id: 3,
        enunciado: "Qual planeta é conhecido como o 'Planeta Vermelho'?",
        opcoes: ['Marte', 'Vênus', 'Júpiter', 'Saturno'],
        resposta: 'Marte',
        id_resposta: 0,
        level: "",
        type: ""
    },
    
]

export default QuestionsItens





