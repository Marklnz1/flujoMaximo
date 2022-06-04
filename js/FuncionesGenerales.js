var ID_GLOBAL = 0;
var NUMERO_NODO = 1;
function generarID(){
    return ID_GLOBAL++;
}
function generarNumeroNodo(){
  return ""+NUMERO_NODO++;
}
function crearCirculoConTexto(x, y, radius, texto, color) {
  let circulo = new fabric.Circle({
    radius,
    fill: "#195972",
    stroke: "white",
    left: 0,
    top: 0
  });

  let textItem = crearTexto(texto);
  centrarTextoDeCirculo(textItem, circulo);

  let group = new fabric.Group([circulo, textItem], {
    left: x ,
    top: y ,
    originX: "center",
    originY: "center",
    id:generarID()
  });
  group.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    bl: false,
    br: false,
    tl: false,
    tr: false,
    mtr: false,
  });
  return {circulo, textItem, grupo:group,id:group.get("id")};
}
function centrarTextoDeCirculo(textoItem, circulo) {
  if (circulo.group != null) {
    textoItem.set("left", -textoItem.width / 2);
    textoItem.set("top", -textoItem.height / 2);
  } else {
    textoItem.set("left", circulo.getRadiusX() - textoItem.width / 2);
    textoItem.set("top", circulo.getRadiusY() - textoItem.height / 2);
  }
}
function crearTexto(texto, tam = 20, color = "white") {
  let textItem = new fabric.Text(texto, {
    fontFamily: "Roboto",
    fontSize: tam
  });
  textItem.set({ fill: color });

  textItem.set("selectable", false);
  return textItem;
}
function crearLinea() {
  let linea = new fabric.Line([0, 0, 0, 0], {
    stroke: "gray",
    perPixelTargetFind: true,
    selectable:false,
    evented: false
  });
  return linea;
}
function calcularVectorUnitario(nodoOrigen, nodoDestino) {
    let x1 = nodoOrigen.getX();
    let y1 = nodoOrigen.getY();
    let x2 = nodoDestino.getX();
    let y2 = nodoDestino.getY();
    let vector = { x: x2 - x1, y: y2 - y1 };
    let moduloVector = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (moduloVector == 0) return;
    vector.x /= moduloVector;
    vector.y /= moduloVector;
    return vector;
  }
  
 function removerItemDeArray (item, arr){
    let i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
  };  