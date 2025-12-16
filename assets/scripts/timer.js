console.log("timer online");

function timer(seconds = 30, bool = true) {
  // secondo è il numero di secondi da cronometrare,
  // bool è una variabile che dopo la promise diventerà falsa
  let i = 0;
  let actualTime = seconds;
  let totalTime = seconds;
  let entireChartBar = 2 * 100 * Math.PI;
  let remainingTimeBar = entireChartBar;
  let elapsedTimeBar = 0;

  return new Promise((end) => {
    const time = setInterval(() => {
      seconds = seconds - 25 / 1000;
      //   qui va inserito codice da eseguire durante (ogni 25 millisecondi)
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

timer(5, true).then((result) => console.log(result));
