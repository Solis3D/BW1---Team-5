console.log("timer online");

function timer(seconds = 30, bool = true) {
  // secondo è il numero di secondi da cronometrare,
  // bool è una variabile che dopo la promise diventerà falsa
  return new Promise((end) => {
    const time = setInterval(() => {
      seconds = seconds - 25 / 1000;
      //   qui va inserito codice da eseguire durante (ogni 25 millisecondi)
      //
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
