// services/QuizService.js
import axios from "axios";


export async function fetchRandomQuestion(id, typesArray, lang = "en") {
  // Montar a URL do endpoint
  // Observação: 'typesArray' deve ser um array de strings, ex: ['artificial_intelligence','history','science']
  // O backend espera múltiplos "types" na query string, então faremos join.
  
  // Exemplo de URL:
  //   ?id=105&types=artificial_intelligence&types=history&types=science&lang=pt
  
  const baseURL = "https://questionsbackend-production.up.railway.app/api/search_random_question/";

  // Monta a query string para "types"
  // ex: "&types=artificial_intelligence&types=history&types=science"
  const typesQuery = typesArray.map(t => `&types=${encodeURIComponent(t)}`).join("");

  const url = `${baseURL}?id=${id}${typesQuery}&lang=${lang}`;

  // Chama a API
  const response = await axios.get(url);
  const data = response.data;

  // Se o backend retornar { error: "...", ... }, trate aqui.
  if (data.error) {
    throw new Error(data.error);
  }

  // O data costuma ter algo como:
  // {
  //   "question": "...",
  //   "options": [...],
  //   "correct": "...",
  //   "question_translated": "..."
  // }
  // Precisamos adaptar para o "QuestionsModel":
  //  { enunciado: string, opcoes: string[] }

  const questionModel = {
    enunciado: data.question_translated || data.question,
    opcoes: data.options || [],
    id_resposta: data.id || "",
    // Se você quiser guardar a resposta correta e usar depois:
    respostaCorreta: data.correct || ""
  };

  return questionModel;
}

export async function fetchProceduralQuestion(type, lang = "en") {

  const baseURL = "https://questionsbackend-production.up.railway.app/api/procedural_question/";

  const url = `${baseURL}?&types=${type}&lang=${lang}`;

   // Chama a API
   const response = await axios.get(url);
   const data = response.data;

   if (data.error) {
    throw new Error(data.error);
  }

  const questionModel = {
    enunciado: data.question,
    opcoes: data.options || [],
    respostaCorreta: data.correct || ""
  };

   return questionModel;


}
