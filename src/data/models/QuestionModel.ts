export default interface QuestionsModel {
    id: number
    enunciado: string
    opcoes: string[]
    id_resposta: number
    resposta: string
    level: string
    type: string
}