"use strict"

const medidaCasilla = 100
const numFilas = 3
const numColumnas = 3

let tablero = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];

let movimientos = 0;
let final = false;

function init() {

  const refCSSRoot = document.documentElement
  refCSSRoot.style.setProperty("--medida", medidaCasilla + "px")
  refCSSRoot.style.setProperty("--filas", numFilas)
  refCSSRoot.style.setProperty("--columnas", numColumnas)

  const refTablero = document.getElementById("tablero")

  for (let fila = 0; fila < numFilas; fila++) {
    for (let columna = 0; columna < numColumnas; columna++) {

      const valor = tablero[fila][columna]

      const refCasilla = document.createElement("div");
      refCasilla.classList.add("casilla");
      refCasilla.numero = valor;
      refCasilla.id = valor;
      refCasilla.style.backgroundImage = `url('assets/${valor}.png')`
      refCasilla.style.left = "0px"
      refCasilla.style.top = "0px" 
      refCasilla.addEventListener("click", () => moverCasilla(valor))
      refTablero.appendChild(refCasilla);
    }
  }

  const refReset = document.getElementById("btnReinici")
  refReset.addEventListener("click", reiniciar)

  reiniciar();
}

function moverCasilla(valorCasilla) {
  if (valorCasilla === 0) {
    return;
  }

  let filaCasilla, columnaCasilla, filaHueca, columnaHueca;

  for (let f = 0; f < numFilas; f++) {
    for (let c = 0; c < numColumnas; c++) {
      if (tablero[f][c] === valorCasilla) {
        filaCasilla = f;
        columnaCasilla = c; 
      } 
      if (tablero[f][c] === 0) {
        filaHueca = f;
        columnaHueca = c;
      }
    }
  }

  let vecino = false;

  if (filaCasilla === filaHueca) {
    if (columnaCasilla - columnaHueca === 1 || columnaCasilla - columnaHueca === -1) {
      vecino = true;
    }
  } else if (columnaCasilla === columnaHueca) {
    if (filaCasilla - filaHueca === 1 || filaCasilla - filaHueca ===  - 1) {
      vecino = true;
    }
  }

  if (vecino === true) {
    tablero[filaHueca][columnaHueca] = valorCasilla;
    tablero[filaCasilla][columnaCasilla] = 0;
    
    movimientos++;
    actualizarDOM();
    comprovar();
  }
}

function actualizarDOM() {
  for (let f = 0; f < numFilas; f++) {
    for (let c = 0; c < numColumnas; c++) {
      const valor = tablero[f][c]

      const refCasilla = document.getElementById(valor);

      if (refCasilla) {
        refCasilla.style.transform = `translate(${c * medidaCasilla}px, ${f * medidaCasilla}px)`
      }
    }
  }  

  document.getElementById("info").textContent = "Movimientos: " + movimientos;
}

function reiniciar() {
  movimientos = 0;
  final = false;

  for (let i = 0; i < 5; i++) {
    for (let f = 0; f < numFilas; f++) {
      for (let c = 0; c < numColumnas; c++) {
        let filaCambio = (f + i) % numFilas;
        let columnaCambio = (c + 1) % numColumnas;

        let tempo = tablero[f][c];
        tablero[f][c] = tablero[filaCambio][columnaCambio];
        tablero[filaCambio][columnaCambio] = tempo;
      }
    }
  }
  
  actualizarDOM(); 
}

function comprovar() {
  let tableroResuelto = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ];

  let victoria = true;
  for (let f = 0; f < numFilas; f++) {
    for (let c = 0; c < numColumnas; c++) {
      if (tablero[f][c] !== tableroResuelto[f][c]) {
        victoria = false;
      }
    }
  }

  if (victoria === true && movimientos > 0) {
    document.getElementById("info").textContent = "Finalizado";
  }

}