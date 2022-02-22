const display = document.querySelector(".display");

const teclasNumeros = document.querySelectorAll("[id*=tecla]");

const operadores = document.querySelectorAll("[id*=operador]");

const historico = document.querySelector(".historico");

let novoNumero = true;
let operador;
let numeroAnterior;
let calcularHistorico;

const atualizarDisplay = (texto) => {
  if (novoNumero === true) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

teclasNumeros.forEach(function (tecla) {
  tecla.addEventListener("click", inserirNumero);
});

const selecionarOperador = (event) => {
  novoNumero = true;
  operador = event.target.textContent;
  calcularHistorico = display.textContent + operador;
  numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach((operador) => {
  operador.addEventListener("click", selecionarOperador);
});

const calcular = () => {
  if (operador !== undefined) {
    calcularHistorico += display.textContent;

    const numeroAtual = display.textContent.replace(",", ".");

    novoNumero = true;

    let resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);

    if (resultado.toString().includes(".")) {
      resultado = resultado.toFixed(1);
    }

    calcularHistorico += "=" + resultado.toString().replace(".", ",");

    atualizarDisplay(resultado.toString().replace(".", ","));
    operador = undefined;

    incluirHistorico();
  }
};

const incluirHistorico = () => {
  const novoHistorico = document.createElement("p");
  novoHistorico.textContent = calcularHistorico;

  historico.appendChild(novoHistorico);

  novoHistorico = undefined;
};

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document
  .querySelector("#limparDisplay")
  .addEventListener("click", limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

document
  .querySelector("#limparCalculo")
  .addEventListener("click", limparCalculo);

const removerUltimoNumero = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent.slice(0, -1));
};

document
  .querySelector("#backspace")
  .addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const inserirDecimal = () => {
  if (!display.textContent.includes(",")) {
    if (display.textContent.length > 0) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};

document.querySelector("#decimal").addEventListener("click", inserirDecimal);
