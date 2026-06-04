const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("limpar");
const equalsButton = document.getElementById("calcular");

let expression = "";
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.value = value || "0";
}

function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

function getLastNumber() {
  return expression.split(/[+\-*/]/).pop();
}

function addValue(value) {
  if (shouldResetDisplay && !isOperator(value)) {
    expression = "";
    shouldResetDisplay = false;
  }

  if (value === "." && (expression === "" || isOperator(expression.slice(-1)))) {
    value = "0.";
  }

  if (value === "." && getLastNumber().includes(".")) {
    return;
  }

  if (isOperator(value)) {
    shouldResetDisplay = false;

    if (expression === "" && value !== "-") {
      return;
    }

    const lastCharacter = expression.slice(-1);
    if (isOperator(lastCharacter)) {
      expression = expression.slice(0, -1);
    }
  }

  expression += value;
  updateDisplay(expression);
}

function clearCalculator() {
  expression = "";
  shouldResetDisplay = false;
  updateDisplay("0");
}

function calculate() {
  if (expression === "" || isOperator(expression.slice(-1))) {
    return;
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) {
      throw new Error("Resultado invalido");
    }

    expression = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(8)));
    shouldResetDisplay = true;
    updateDisplay(expression);
  } catch {
    expression = "";
    shouldResetDisplay = true;
    updateDisplay("Erro");
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value) {
      addValue(value);
    }
  });
});

clearButton.addEventListener("click", clearCalculator);
equalsButton.addEventListener("click", calculate);
