console.log("timer online");

// per inserire un timer nella pagina è necessario avere un div con id 'timer-box' <div id="timer-box"></div>
// è sufficiente poi avviare la funzione timer() la funzione ha un parametro, i secondi. Alla
// fine della funzione viene restituito un valore false. I secondi di default sono 30 secondi.

function timer(seconds = 30) {
  // seconds è il numero di secondi da cronometrare,
  let i = 0;
  let actualTime = seconds;
  let totalTime = seconds;
  let entireChartBar = 2 * 100 * Math.PI;
  let remainingTimeBar = entireChartBar;
  let elapsedTimeBar = 0;
  // bool è una variabile che dopo la promise diventerà falsa
  let bool = true;

  return new Promise((end) => {
    const time = setInterval(() => {
      seconds = seconds - 25 / 1000;
      //   qui va inserito codice da eseguire durante (ogni 25 millisecondi)
      //
      //
      i += 1;
      if ((i = 40)) {
        i = 0;
        actualTime = Math.round(seconds + 0.5);
        if (actualTime === 0) {
          actualTime = 0;
        }
        // actualTime rappresenta il numero da mostrare nella console
      }
      //   calcoliamo ora i valori da inserire per modificare il riempimento del cerchio
      remainingTimeBar = (seconds / totalTime) * entireChartBar;
      elapsedTimeBar = entireChartBar - remainingTimeBar;
      //
      //   inseriamo la funzione per generare il timer visuale
      timerGenerator(actualTime, remainingTimeBar, elapsedTimeBar);
      //
      if (seconds <= 0) {
        clearInterval(time);
        bool = false;
        // qui va inserito eventuale codice da eseguire alla fine
        end(bool);
      }
    }, 25);
  });
}

timer(5).then((result) => console.log(result));

function timerGenerator(timeInSeconds, remainingTimeIndex, elapsedTimeIndex) {
  //
  const positionDiv = document.querySelector("#timer-box");

  positionDiv.innerHTML =
    `<div
        style="
          aspect-ratio: 1/1;
          font-family: 'Outfit', sans-serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
          height: 110px;
          box-sizing: border-box;
        "
      >
        <div style="position: relative">
          <svg width="100%" height="100%" viewBox="0 0 224 224" style="transform: rotate(-100deg)">
            <linearGradient id="linearColors" x1="100%" x2="0%">
              <stop offset="0%" stop-color="#00ffff"></stop>
              <stop offset="100%" stop-color="#00ffff"></stop>
            </linearGradient>
            <circle cx="112" cy="112" fill="none" r="100" stroke="#ffffff" stroke-linecap="butt" stroke-width="24" style="opacity: 40%"></circle>
            <path
              d="
            M 112, 112 
            m -100, 0 
            a 100,100 0 1,0 200,0 
            a 100,100 0 1,0 -200,0
          "
              fill="none"
              stroke="url(#linearColors)"
              stroke-dasharray="` +
    remainingTimeIndex +
    " " +
    elapsedTimeIndex +
    `"
              stroke-dashoffset="-293.21531433504737"
              stroke-linecap="butt"
              stroke-width="24"
            ></path>
            <!-- stroke-dasharray è da modificare 2πr = 2π*100 circonferenza del cerchio-->
          </svg>
          <div style="color: white; opacity: 90%; margin: auto; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
            <div style="font-size: 0.5rem; font-weight: 500">SECONDS</div>
            <div style="font-size: 2.6rem; font-weight: 300; line-height: 0.9">` +
    timeInSeconds +
    `</div>
            <div style="font-size: 0.5rem; font-weight: 300">REMAINING</div>
          </div>
        </div>
      </div>`;
}
