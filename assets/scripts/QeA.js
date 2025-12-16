let quiz = [
  {
    question: "Domanda 1",
    answers: ["Risposta1", "Risposta2", "Risposta3", "Risposta4"],
    correctAnswer: "1",
  },
  {
    question: "Domanda 2",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "Domanda 3",
    answers: ["1", "2", "3"],
    correctAnswer: "2",
  },
  {
    question: "Domanda 4",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
  {
    question: "Domanda 5",
    answers: ["1", "2"],
    correctAnswer: "2",
  },
  {
    question: "Domanda 6",
    answers: ["1", "2"],
    correctAnswer: "2",
  },
  {
    question: "Domanda 7",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3",
  },
  {
    question: "Domanda 8",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3",
  },
  {
    question: "Domanda 9",
    answers: ["1", "2", "3"],
    correctAnswer: "1",
  },
  {
    question: "Domanda 10",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3",
  },
];

let currentQuestion = 0; //parto da singola domanda perchè se ciclo escono tutte insieme sulla pagina.
//IMPORTATE current question diventa praticamente un indice da trattare come tale
// perchè di partenza ho un array quindi quello zero è un indice d'array contenente un oggetto
const quizContainer = document.getElementById("quiz"); // prendo contenitore con id
const questionContainer = document.createElement("div"); //creo elemento div dentro
questionContainer.classList.add("question"); // assegno classe
const question = document.createElement("h3"); //creo vero e proprio tag per domanda
question.textContent = quiz[currentQuestion].question; // per il testo entro nell'indici di array con quadre e con punto seleziono
// solo question che è quello che mi serve

questionContainer.appendChild(question); // metto nel dom l'h3 nel div
quizContainer.appendChild(questionContainer); // metto tutto nel main

const answersContainer = document.createElement("div"); // div contenitore per domande
answersContainer.classList.add("answersContainer"); // la sua classe

for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
  //ciclo per poter leggere tutte le posizioni relative alle risposte  la proprietà answers ha un array
  const button = document.createElement("button"); // creo un bottone per ognuna

  button.textContent = quiz[currentQuestion].answers[i]; //prendo il testo di ogni posizione e lo inserisco
  answersContainer.appendChild(button); //metto il button nel div
  button.addEventListener("click", function (click) {
    //faccio si che il bottone sia pronto a far qualcosa quando cliccato
    console.log("CLICCATA RISPOSTA!", click); //test
    if (currentQuestion < quiz.length - 1) {
      // lo ciclo per dirgli se le domande ancora non sono finite
      currentQuestion++; // aumenta posizione che leggi dell'array
    } else {
      console.log("finito"); // da capire come cambiare pagina
    }
  });
}

questionContainer.appendChild(answersContainer); // le metto dentro in modo tale che funzionino insieme per apparire e sparire
// anche per css più easy da gestire .. forse
