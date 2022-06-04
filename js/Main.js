var CANVAS = null;
var CTX = null;
var APS = 60;
var uniones = [];
var nodos = [];
var GESTOR_NODOS = null;
var MOUSEX = 0;
var MOUSEY = 0;
var ACCION_ACTUAL = "seleccionar";
var NODOS_SELECCIONADOS = [];
var FLUJO_MAXIMO = null;
function HandleElement(obj) {
  NODOS_SELECCIONADOS.length = 0;

  let idNodoActual = obj.selected[0].id;
  let nodoActual = GESTOR_NODOS.getNodoID(idNodoActual);

  let idNodoAnterior = null;
  let nodoAnterior = null;

  if (obj.deselected != null) {
    idNodoAnterior = obj.deselected[0].id;
    nodoAnterior = GESTOR_NODOS.getNodoID(idNodoAnterior);
  } else {
    nodoActual.setSeleccionado(true);
  }
  if (nodoAnterior != null) {
    NODOS_SELECCIONADOS.push(nodoAnterior);
  }
  NODOS_SELECCIONADOS.push(nodoActual);

  switch (ACCION_ACTUAL) {
    case "eliminarNodo":
      GESTOR_NODOS.eliminarNodoID(idNodoActual);
      break;
    case "crearEnlace":
      nodoActual.setColor("#f53636");
      if (nodoAnterior == null) {
        break;
      }

      if (GESTOR_NODOS.getEnlace(nodoActual, nodoAnterior)) {
        GESTOR_NODOS.resetearNodos();
        break;
      }
      nodoActual.setColor("green");
      nodoActual.setSeleccionado(true);
      mostrarVentanaCrearEnlace(nodoAnterior, nodoActual);

      break;
    case "eliminarEnlace":
      nodoActual.setColor("#f53636");
      if (nodoAnterior == null) {
        break;
      }
      GESTOR_NODOS.resetearNodos();
      GESTOR_NODOS.eliminarEnlace(nodoActual, nodoAnterior);
      setCursorUrl("icono-eliminarEnlace1.png", 17, 10);

      break;
    default:
      break;
  }
  // let nombreNodoActual = GESTOR_NODOS.getNodoID(obj.selected[0].id).getNombre();
  // let nombreNodoAnterior = null;
  // if(obj.deselected!=null){
  //   nombreNodoAnterior = GESTOR_NODOS.getNodoID(obj.deselected[0].id).getNombre();
  // }
  // let enlace = GESTOR_NODOS.getEnlace(nombreNodoActual,nombreNodoAnterior);
  // console.log(enlace);
}
function setCursor(cursor) {
  CANVAS.defaultCursor = cursor;
  CANVAS.hoverCursor = cursor;
  CANVAS.moveCursor = cursor;
}
function setCursorUrl(cursorUrl, x, y) {
  CANVAS.defaultCursor = `url(" ${cursorUrl} ")${x} ${y}, auto`;
  CANVAS.hoverCursor = `url(" ${cursorUrl} ") ${x} ${y}, auto`;
  CANVAS.moveCursor = `url(" ${cursorUrl} ") ${x} ${y}, auto`;
}
function setCursorObjeto(c1, c2) {
  CANVAS.defaultCursor = c1;
  CANVAS.hoverCursor = c2;
  CANVAS.moveCursor = c1;
}
function setCursorObjetoUrl(c1, c2, x, y) {
  CANVAS.defaultCursor = c1;
  CANVAS.hoverCursor = `url(" ${c2} ") ${x} ${y}, auto`;
  CANVAS.moveCursor = c1;
}
function main() {
  // setDimensionCanvas(1000,1000);

  CANVAS = new fabric.Canvas("canvas", {
    preserveObjectStacking: true,
    fireRightClick: true, // <-- enable firing of right click events
    fireMiddleClick: true, // <-- enable firing of middle click events
    stopContextMenu: true, // <--  prevent context menu from showing
  });

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, false);

  // CANVAS.backgroundColor = "red";
  CANVAS.selection = false;

  GESTOR_NODOS = new GestorNodos();
  FLUJO_MAXIMO = new FlujoMaximo(GESTOR_NODOS);
  CANVAS.on({
    "selection:updated": HandleElement,
    "selection:created": HandleElement,
  });

  //==============
  // GESTOR_NODOS.crearNodo(130, 248, "1");
  // GESTOR_NODOS.crearNodo(276, 121, "2");
  // GESTOR_NODOS.crearNodo(421, 353, "3");
  // GESTOR_NODOS.crearNodo(233, 415, "4");
  // GESTOR_NODOS.crearNodo(472, 125, "6");

  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("1"),
  //   GESTOR_NODOS.getNodo("2"),
  //   "8",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("1"),
  //   GESTOR_NODOS.getNodo("6"),
  //   "7",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("1"),
  //   GESTOR_NODOS.getNodo("4"),
  //   "4",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("2"),
  //   GESTOR_NODOS.getNodo("6"),
  //   "5",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("2"),
  //   GESTOR_NODOS.getNodo("3"),
  //   "5",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("3"),
  //   GESTOR_NODOS.getNodo("4"),
  //   "5",
  //   "4"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("3"),
  //   GESTOR_NODOS.getNodo("6"),
  //   "6",
  //   "0"
  // );
  // GESTOR_NODOS.crearEnlace(
  //   GESTOR_NODOS.getNodo("4"),
  //   GESTOR_NODOS.getNodo("6"),
  //   "2",
  //   "0"
  // );

  //==============
  CANVAS.on("mouse:down", function (e) {
    switch (ACCION_ACTUAL) {
      case "crearNodo":
        GESTOR_NODOS.crearNodo(MOUSEX, MOUSEY, generarNumeroNodo());
        GESTOR_NODOS.bloquearMovimiento(true);
        GESTOR_NODOS.bloquearSeleccion(true);

        break;
      case "crearEnlace":
        if (e.target == null) {
          GESTOR_NODOS.resetearNodos();
          setCursorUrl("icono-crearEnlace1.png", 17, 10);
        }

        break;
      case "eliminarEnlace":
        if (e.target == null) {
          GESTOR_NODOS.resetearNodos();
          setCursorUrl("icono-eliminarEnlace1.png", 17, 10);
        }
      default:
        break;
    }
  });
  CANVAS.on("mouse:over", function (e) {
    if (e.target == null) return;
    let idNodoActual = e.target.id;
    let nodoActual = GESTOR_NODOS.getNodoID(idNodoActual);
    if (nodoActual == null) return;

    switch (ACCION_ACTUAL) {
      case "editar":
        nodoActual.setColor("#db1616");
        break;
      case "eliminarNodo":
        nodoActual.setColor("#db1616");

        break;
      case "crearEnlace":
        if (
          NODOS_SELECCIONADOS.length == 1 &&
          nodoActual.getID() != NODOS_SELECCIONADOS[0].getID()
        ) {
          setCursorUrl("icono-crearEnlace2.png", 15, 15);
        } else {
          setCursorUrl("icono-crearEnlace1.png", 17, 10);
        }

        if (!nodoActual.estaSeleccionado()) {
          nodoActual.setColor("#db1616");
        }
        break;
      case "eliminarEnlace":
        if (
          NODOS_SELECCIONADOS.length == 1 &&
          nodoActual.getID() != NODOS_SELECCIONADOS[0].getID()
        ) {
          setCursorUrl("icono-eliminarEnlace2.png", 15, 15);
        } else {
          setCursorUrl("icono-eliminarEnlace1.png", 17, 10);
        }
        if (!nodoActual.estaSeleccionado()) {
          nodoActual.setColor("#db1616");
        }
        break;
      default:
        break;
    }
  });
  CANVAS.on("mouse:out", function (e) {
    if (e.target == null) return;

    let idNodoActual = e.target.id;
    let nodoActual = GESTOR_NODOS.getNodoID(idNodoActual);
    if (nodoActual == null) return;
    switch (ACCION_ACTUAL) {
      case "editar":
        nodoActual.setColor("#195972");

        break;
      case "eliminarNodo":
        nodoActual.setColor("#195972");
        break;
      case "crearEnlace":
        if (NODOS_SELECCIONADOS.length == 1) {
          setCursorUrl("icono-crearEnlace2.png", 15, 10);
        } else {
          setCursorUrl("icono-crearEnlace1.png", 17, 10);
        }
        if (!nodoActual.estaSeleccionado()) {
          nodoActual.setColor("#195972");
        }
        break;
      case "eliminarEnlace":
        if (NODOS_SELECCIONADOS.length == 1) {
          setCursorUrl("icono-eliminarEnlace2.png", 15, 10);
        } else {
          setCursorUrl("icono-eliminarEnlace1.png", 17, 10);
        }
        if (!nodoActual.estaSeleccionado()) {
          nodoActual.setColor("#195972");
        }

        break;
      default:
        break;
    }
  });
  CANVAS.on("mouse:move", function (e) {
    actualizarMouse(e);
  });

  CANVAS.on("object:moving", function (e) {
    GESTOR_NODOS.actualizar();
  });
}
function crearEnlaceVentana() {
  let peso1 = document.getElementById("peso1");
  let peso2 = document.getElementById("peso2");

  GESTOR_NODOS.crearEnlace(
    NODOS_SELECCIONADOS[0],
    NODOS_SELECCIONADOS[1],
    peso1.value,
    peso2.value
  );
  peso1.value = 0;
  peso2.value = 0;
}
function setAccion(accion) {
  ACCION_ACTUAL = accion;
  GESTOR_NODOS.resetearNodos();
  GESTOR_NODOS.bloquearMovimiento(true);
  GESTOR_NODOS.bloquearSeleccion(false);
  let textoPaso = document.querySelector(".titulo_pasos");
  textoPaso.innerHTML = "NO HAY CALCULO PREVIO"
  
  switch (accion) {
    case "editar":
      GESTOR_NODOS.bloquearMovimiento(false);
      CANVAS.defaultCursor = "default";
      CANVAS.hoverCursor = "pointer";
      CANVAS.moveCursor = "default";
      FLUJO_MAXIMO.pasos.length = 0;

      break;
    case "crearNodo":
      setCursorUrl("icono-agregar.png", 27, 27);
      GESTOR_NODOS.bloquearSeleccion(true);
      FLUJO_MAXIMO.pasos.length = 0;
      break;
    case "eliminarNodo":
      setCursorUrl("icono-eliminar.png", 12, 12);
      FLUJO_MAXIMO.pasos.length = 0;

      break;
    case "crearEnlace":
      setCursorUrl("icono-crearEnlace1.png", 15, 10);
      FLUJO_MAXIMO.pasos.length = 0;

      break;
    case "eliminarEnlace":
      setCursorObjetoUrl("default", "icono-eliminarEnlace1.png", 12, 12);
      FLUJO_MAXIMO.pasos.length = 0;

      break;
    case "calcular":
      FLUJO_MAXIMO.calcularFlujoMaximo(
        GESTOR_NODOS.nodos[0],
        GESTOR_NODOS.nodos[GESTOR_NODOS.nodos.length - 1]
      );
     
    textoPaso.innerHTML = "RESULTADO FINAL";
      break;

    case "mostrarPasos":
      FLUJO_MAXIMO.cargarPasoInicial();
      break;
    case "pasoSiguiente":
      FLUJO_MAXIMO.cargarPasoSiguiente();
      break;
    case "pasoAnterior":
      FLUJO_MAXIMO.cargarPasoAnterior();
      break;
  }
}
function resizeCanvas() {
  CANVAS.setHeight(window.innerHeight * 0.7);
  CANVAS.setWidth(window.innerWidth * 0.8 * 0.9);
  CANVAS.renderAll();
}
function actualizarMouse(event) {
  let { x, y } = CANVAS.getPointer(event.e);
  MOUSEX = x;
  MOUSEY = y;
}
