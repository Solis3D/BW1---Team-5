// la funzione graph() riceve due parametri: risposte corrette e risposte totali
// ciò avviene tramite due parametri presenti nell'url nominati score e total.
// Se i parametri sono assenti in automatico i loro valori diventano rispettivamente
// 0 e 1. La funzione genera il grafico in un div con id "result-graph", cioè un div
// <div id="result-graph"></div>. La prova viene considerata superata con almeno il 60%
// di risposte corrette, il testo centrale cambia in base al risultato.

const url = new URLSearchParams(window.location.search);

let score = url.get("score");

if (score === null) {
  score = 0;
}

let total = url.get("total");

if (total === null) {
  total = 1;
}

function graph(score, total) {
  const div = document.querySelector("#result-graph");
  const correctPercentage = Math.round((score / total) * 1000) / 10;
  const wrongPercentage = Math.round(((total - score) / total) * 1000) / 10;

  const circleCircumference = 2 * 95 * Math.PI;
  const circleCorrect = (score / total) * circleCircumference;
  const circleWrong = circleCircumference - circleCorrect;

  let string = "";

  if (correctPercentage >= 60) {
    string = `<div style="font-size: 1rem; font-weight: 500">Congratulations!</div>
                <div style="font-size: 1rem; font-weight: 500; line-height: 0.9; color: #00ffff">You passed the exam.</div>
                <div style="font-size: 0.7rem; font-weight: 300; margin-top: 1.2rem">
                  We'll send you the certificate in few minutes. <br />
                  Check your email (including promotions / spam folder)
                </div>`;
  } else {
    string = `<div style="font-size: 1rem; font-weight: 500">Oh, no!</div>
                <div style="font-size: 1rem; font-weight: 500; line-height: 0.9; color: #00ffff">You failed the exam.</div>
                <div style="font-size: 0.7rem; font-weight: 300; margin-top: 1.2rem">
                  We'll send you instructions on how to try again within a few minutes. Check your email (including your promotions/spam folder)
                </div>`;
  }

  div.innerHTML =
    `<div style="text-align: center; color: white; font-family: 'Outfit', sans-serif; font-optical-sizing: auto; font-style: normal; min-width: 620px">
        <div style="display: inline-block; height: 330px; max-width: 840px; width: 100%; position: relative">
          <!-- div centrale -->
          <div style="aspect-ratio: 1/1; height: 330px; position: absolute; left: 50%; transform: translateX(-50%)">
            <div style="position: relative">
              <svg width="100%" height="100%" viewBox="0 0 224 224" style="transform: rotate(-90deg); filter: drop-shadow(0px 0px 10px black)">
                <linearGradient id="linearColors" x1="100%" x2="0%">
                  <stop offset="0%" stop-color="#00ffff"></stop>
                  <stop offset="100%" stop-color="#00ffff"></stop>
                </linearGradient>
                <circle cx="112" cy="112" fill="none" r="95" stroke="#c2128d" stroke-linecap="butt" stroke-width="34" style="opacity: 100%"></circle>
                <path
                  d="
            M 112, 112 
            m -95, 0 
            a 95,95 0 1,0 190,0 
            a 95,95 0 1,0 -190,0
          "
                  fill="none"
                  stroke="url(#linearColors)"
                  stroke-dasharray="` +
    circleCorrect +
    ` ` +
    circleWrong +
    `"
                  stroke-dashoffset="-297.3"
                  stroke-linecap="butt"
                  stroke-width="34"
                ></path>
              </svg>
              <div
                style="color: white; opacity: 100%; margin: auto; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
              >
                ` +
    string +
    `
              </div>
            </div>
          </div>
          <!-- div di sinistra -->
          <div style="text-align: left; position: absolute; top: 50%; transform: translateY(-50%)">
            <div style="font-weight: 350; font-size: 2.5rem; line-height: 1.9rem">Correct</div>
            <div style="font-weight: 700; font-size: 2.5rem">` +
    correctPercentage +
    `%</div>
            <div style="font-weight: 200; font-size: 1rem; line-height: 1rem">` +
    score +
    `/` +
    total +
    ` questions</div>
          </div>
          <!-- div di destra -->
          <div style="text-align: right; position: absolute; top: 50%; transform: translateY(-50%); right: 0%; opacity: 75%">
            <div style="font-weight: 350; font-size: 2.5rem; line-height: 1.9rem">Wrong</div>
            <div style="font-weight: 700; font-size: 2.5rem">` +
    wrongPercentage +
    `%</div>
            <div style="font-weight: 200; font-size: 1rem; line-height: 1rem">` +
    (total - score) +
    `/` +
    total +
    ` questions</div>
          </div>
        </div>
      </div>`;
}

graph(score, total);
