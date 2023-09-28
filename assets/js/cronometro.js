const botaoStart = document.getElementById('btn-start') 
const txtCronometro = document.getElementById('texto-cronometro')
const botaoNext = document.getElementById('botao-next')


let segundosRestantes = 25 * 60;
let contagem;
let taPausado = true;
let taNoDescanso = false

function contar() {
  if (!contagem) {
    contagem = setInterval(() => {
      let minutos = parseInt(segundosRestantes / 60);
      let segundos = segundosRestantes % 60;

      if (!taPausado) {
        if (minutos <= 9) {
          minutos = `0${minutos}`;
        }
        if (segundos <= 9) {
          segundos = `0${segundos}`;
        }
        if (segundosRestantes < 0) {
          clearInterval(contagem);
          contagem = null
          taNoDescanso = !taNoDescanso
          segundosRestantes = taNoDescanso ? 5 * 60 : 25 * 60
          contar()
        } else {
          txtCronometro.innerHTML = `${minutos}:${segundos}`;
          segundosRestantes--;
        }
      }
    }, 1000);
  }
}

botaoStart.addEventListener("click", contar);
botaoStart.addEventListener("click", () => {
  taPausado = !taPausado;
  if (taPausado === true) {
    botaoStart.innerHTML = "Continuar";
  } else {
    botaoStart.innerHTML = "Pausar";
  }
});

function terminarTimerQuandoApertaOBotao(){
   segundosRestantes = -1
   contar()
}
botaoNext.addEventListener('click',terminarTimerQuandoApertaOBotao)
