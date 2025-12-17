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
//currentQuestion è una variabile che rappresenta l’indice della domanda attualmente visualizzata.
//Serve per accedere all’oggetto corretto dell’array quiz e permette di avanzare sequenzialmente nel quiz usando un semplice incremento.
let score = 0; // variabile per tener conto del punteggio finale, segna solo risposte corrette qui dentro
// fuori dalla variabile per non resettarsi ogni giro e per poter esser usata anche poi
let selectedAnswer = null; //  variabile d' appoggio per confronto con con risposta corretta, qui ci finirà un INDICE, null perchè parte da vuoto
const quizContainer = document.getElementById("quiz"); // prendo contenitore main html generale con id e lo rendo una variabile js
function clearAll() {
  quizContainer.innerHTML = ""; //SUPERIMPORTANTISSIMA!!!!!! Per cambiare domanda non cambio pagina ma cancello
  // tutto contenuto quizContainer e riparte il ciclo
}
function showQuestion() {
  // funzione per test vera e propria
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

  // li appendo dopo nel tutto così prima gli do le cose da fare poi li metto

  for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
    //ciclo per poter leggere tutte le posizioni relative alle risposte  la proprietà answers ha un array
    const button = document.createElement("button"); // creo un bottone per ognuna
    button.classList.add("answerButton"); // classe per bottone css non ancora selezionato
    button.textContent = quiz[currentQuestion].answers[i]; //prendo il testo di ogni posizione e lo inserisco
    answersContainer.appendChild(button); //metto il button nel div
    button.addEventListener("click", function (event) {
      //funzione per associare al click altro
      const allButtons = answersContainer.querySelectorAll(".answerButton"); // variabile per selezionare tutti i bottoni

      allButtons.forEach((btn) => {
        btn.classList.remove("selected"); // al click per ogni bottone tolgo la classe selezionata.. serve per non farli rimanere
      }); // selezionati quando ne schiaccio p iù di uno

      event.target.classList.add("selected"); // per il target del click metto la classe selezionato
      selectedAnswer = i; // salvo la mia risposta siccome sono ancora nel ciclo con i dentro la constate che mi ero creata
    }); // chiusura della funzione dentro la funzione addEventListener
  }

  nextButton.addEventListener("click", function () {
    // funzione per bottone avanti sotto
    if (selectedAnswer === null) return; // niente risposta → niente avanti

    const rightAnswer = parseInt(quiz[currentQuestion].correctAnswer) - 1; // creo variabile per risposta giusta -1 per indice risposte sopra
    const allButtons = answersContainer.querySelectorAll(".answerButton"); // variabile per tutti i bottoni

    allButtons.forEach((btn, index) => {
      //uso index e non il testo di     correctAnswer perchè può essere una cosa più intercambiabile e il testo che può avere spazi maiuscole ecc
      if (index === rightAnswer) {
        // comparo
        btn.classList.add("correctAnswer"); // verde
      }

      if (index === selectedAnswer && selectedAnswer !== rightAnswer) {
        // serve fare doppia comparazione se no diventano tutti rossi gli altri non giusti
        btn.classList.add("wrongAnswer"); // rosso
      }

      btn.disabled = true; // blocco click .. è utile nel timeout per non dar l'idea che si possa "aggirare il sistema"
      // e schiacciare la risposta corretta dopo averla vista illuminare. Anche se in realtà i risultati rimangono invariati
    });

    if (selectedAnswer === rightAnswer) {
      score++; // aggiorno punteggio
    }

    setTimeout(function () {
      // funzione per cambiare domanda con attesa per mostrare il cambio di classi risp giusta o sbagliata
      selectedAnswer = null; // lo devo rimettere a null se no per la domanda dopo si ricorda l'indice selezionato dalla domanda prima e casino

      if (currentQuestion < quiz.length - 1) {
        //per mandare avanti le domande guardo che ce ne siano ancora
        currentQuestion++;
        showQuestion(); //riparte tutto da capo richiamandola
      } else {
        // se non ne ha più mando a pagina dopo
        // window.location.assign("./results.html?score=" + score + "&total=" + quiz.length);
      }
    }, 800);
  });

  questionContainer.appendChild(answersContainer); // le metto effetivamente in html solo una volta avergli detto cosa fare
  const progress = document.createElement("section"); //per sotto dove domande su 10 creo una section
  progress.classList.add("progress"); // con classe
  progress.textContent = "Domanda " + (currentQuestion + 1) + " / " + quiz.length; // il suo contenuto +1 perchè indice da 0
  questionContainer.appendChild(progress);
  quizContainer.appendChild(questionContainer);

  quizContainer.appendChild(nextContainer); // più easy da gestire css
}

showQuestion(); // parte effettivamente la prima domanda. All'inizio era solo per cambiare da una all'altra

// 2 pagine meglio .. per cambiare pagina bisogna caricare la pagina results... con le 2 variabili

// carico il nuovo doc html result con paramentro nell'indirizzo .. window.location.assign().. window.location.assign('./results.html')
