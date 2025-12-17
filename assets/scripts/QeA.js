let quiz = [
  {
    question: "In computing, what does MIDI stand for? ",
    answers: [
      "Musical Instrument Digital Interface",
      "Musical Interface of Digital Instruments",
      "Modular Interface of Digital Instruments",
      "Musical Instrument Data Interface",
    ],
    correctAnswer: "1",
  },
  {
    question: "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
    answers: ["Microsoft", "Apple", "Atari", "Commodore"],
    correctAnswer: "2",
  },
  {
    question: "The numbering system with a radix of 16 is more commonly referred to as",
    answers: ["Binary", "Hexidecimal", "Octal", "Duodecimal"],
    correctAnswer: "2",
  },
  {
    question: "What does the computer software acronym JVM stand for? ",
    answers: ["Just Virtual Machine", "Java Visual Machine", "Java Vendor Machine", "Java Virtual Machine"],
    correctAnswer: "4",
  },
  {
    question: "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    answers: ["HD Graphics 700 ", "HD Graphics 500", "HD Graphics 600", "HD Graphics 7000"],
    correctAnswer: "2",
  },
  {
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    answers: ["True", "False"],
    correctAnswer: "2",
  },
  {
    question: "What programming language was GitHub written in?",
    answers: ["Python", "JavaScript", "Ruby", "Lua"],
    correctAnswer: "3",
  },
  {
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    answers: [".jpeg", ".png", ".svg", ".gif"],
    correctAnswer: "3",
  },
  {
    question: "A Mac is not a PC",
    answers: ["false", "true"],
    correctAnswer: "1",
  },
  {
    question: "Time on Computers is measured via the EPOX System.",
    answers: ["true", "false"],
    correctAnswer: "1",
  },
];

let currentQuestion = 0; //parto da singola domanda perchè se ciclo escono tutte insieme sulla pagina.
//IMPORTATE current question diventa praticamente un indice da trattare come tale
// perchè di partenza ho un array quindi quello zero è un indice d'array contenente un oggetto
const quizContainer = document.getElementById("quiz"); // prendo contenitore con id
let score = 0; // variabile per tener conto del punteggio finale
let selectedAnswer = null; // per cambiare da avanti con clicco risposta a avanti con bottone serve variabile appoggio per nuovo confronto

function clearAll() {
  quizContainer.innerHTML = ""; //SUPERIMPORTANTISSIMA!!!!!! Per cambiare pagina cancello tutto e riparte il ciclo
}
function showQuestion() {
  clearAll();

  const questionContainer = document.createElement("div"); //creo elemento div dentro
  questionContainer.classList.add("question"); // assegno classe
  const question = document.createElement("h3"); //creo vero e proprio tag per domanda
  question.textContent = quiz[currentQuestion].question; // per il testo entro nell'indici di array con quadre e con punto seleziono
  // solo question che è quello che mi serve
  questionContainer.appendChild(question);

  const answersContainer = document.createElement("div"); // div contenitore per domande
  answersContainer.classList.add("answersContainer"); // la sua classe

  const nextContainer = document.createElement("div"); // creo div contenitore tasto avanti
  nextContainer.classList.add("nextContainer"); // aggiungo classe
  const nextButton = document.createElement("button"); //creo bottone
  nextButton.textContent = "Avanti"; //testo nel bottone
  nextContainer.appendChild(nextButton); // inserisco il bottone nel div

  for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
    //ciclo per poter leggere tutte le posizioni relative alle risposte  la proprietà answers ha un array
    const button = document.createElement("button"); // creo un bottone per ognuna
    button.classList.add("answerButton"); // classe per bottone css non ancora selezionato
    button.textContent = quiz[currentQuestion].answers[i]; //prendo il testo di ogni posizione e lo inserisco
    answersContainer.appendChild(button); //metto il button nel div
    button.addEventListener("click", function applySelectedClass() {
      // creo funzione per ascoltare e fare
      const allButtons = answersContainer.querySelectorAll(".answerButton"); // per selezionarli tutti
      allButtons.forEach(function (btn) {
        // per ognuno
        btn.classList.remove("selected"); // devo toglierli se no ogni volta che schiaccio rimangono schiacciati
      });

      button.classList.add("selected"); //nuova classe per quelli selezionati

      selectedAnswer = i;
    });
  }

  nextButton.addEventListener("click", function () {
    if (selectedAnswer === null) {
      return; // non vai avanti se non hai scelto
    }

    if (selectedAnswer === parseInt(quiz[currentQuestion].correctAnswer) - 1) {
      score++;
    }

    selectedAnswer = null; // reset per la prossima domanda

    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      // window.location.assign("./results.html?score=" + score);
    }
  });

  questionContainer.appendChild(answersContainer); // le metto dentro in modo tale che funzionino insieme per apparire e sparire

  const progress = document.createElement("section"); //per sotto dove domande su 10 creo una section
  progress.classList.add("progress"); // con classe
  progress.textContent = "Domanda " + (currentQuestion + 1) + " / " + quiz.length; // il suo contenuto +1 perchè indice da 0
  questionContainer.appendChild(progress);
  quizContainer.appendChild(questionContainer);
  // anche per css più easy da gestire .. forse
  quizContainer.appendChild(nextContainer);
}

showQuestion();

// 2 pagine meglio .. per cambiare pagina bisogna caricare la pagina results... con le 2 variabili

// carico il nuovo doc html result con paramentro nell'indirizzo .. window.location.assign().. window.location.assign('./results.html')
