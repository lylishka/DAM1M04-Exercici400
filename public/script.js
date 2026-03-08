"use strict"

const medidaCasilla = 100
const numFilas = 3
const numColumnas = 3

let tableroResuelto = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];

let tableroActual = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];

let movimientos = 0

function init() {

  // Definir los valors de las variablas CSS
  const refCSSRoot = document.documentElement
  refCSSRoot.style.setProperty("--medida", medidaCasilla + "px")
  refCSSRoot.style.setProperty("--filas", numFilas)
  refCSSRoot.style.setProperty("--columnas", numColumnas)

  // Obtener la referencia del tablero donde se colocaran las casillas
  const refTablero = document.getElementById("tablero")

  // Agregar casillas al tablero
  for (let fila = 0; fila < numFilas; fila++) {
    for (let columna = 0; columna < numColumnas; columna++) {

      const valor = tableroActual[fila][columna]

      const refCasilla = document.createElement("div");
      refCasilla.classList.add("casilla");
      refCasilla.numero = valor;
      refCasilla.style.backgroundImage = `url('assets/${valor}.png')`
      refCasilla.style.left = `${columna * medidaCasilla}px`
      refCasilla.style.top = `${fila * medidaCasilla}px`     
      refCasilla.addEventListener("click", () => moverCasilla(fila, columna))
      refTablero.appendChild(refCasilla);
    }
  }

  // Agregar el boton de Reiniciar
  const refReset = document.getElementById("btnReinici")
  refReset.addEventListener("click", reiniciar)

  //reiniciar()
}

function moverCasilla(fila, columna) {
  var filaHueca = 0
  var columnaHueca = 0

  for (let f = 0; f < numFilas; f++) {
    for (let c = 0; c < numColumnas; c++) {
      const valor = tableroActual[f][c]

      if (valor === 0) {
        filaHueca = f;
        columnaHueca = c;
      }
    }
  }


  // Mostrar los cambios en la Web
  actualizarDOM()
}

function actualizarDOM() {
  const refTablero = document.getElementById("tablero");

  
}

function reiniciar() {
  mouFitxa(1, 1)
}
