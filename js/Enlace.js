class Enlace {
    linea;
    nodo1;
    nodo2;
    texto1;
    texto2;
    id;
  constructor(nodo1, nodo2,peso1,peso2) {
    this.nodo1 = nodo1;
    this.nodo2 = nodo2;
    this.textoItem1 = crearTexto(peso1,17,"#3A6170");
    this.textoItem2 = crearTexto(peso2,17,"#3A6170");
    this.textoItem1.set("fontStyle","bold");
    this.textoItem2.set("fontStyle","bold");
    this.textoItem1.set("backgroundColor","white");
    this.textoItem2.set("backgroundColor","white");

    this.linea = crearLinea();

    this.actualizar();

    CANVAS.add(this.linea);
    CANVAS.add(this.textoItem1);
    CANVAS.add(this.textoItem2);
    this.linea.sendToBack();
    this.id = generarID();
  }
  actualizar() {
    this.actualizarPosTextoEnlace(this.nodo1, this.nodo2, this.textoItem1);
    this.actualizarPosTextoEnlace(this.nodo2, this.nodo1, this.textoItem2);
  
    this.linea.set({
      x1: this.nodo1.getX(),
      y1: this.nodo1.getY(),
      x2: this.nodo2.getX(),
      y2: this.nodo2.getY(),
    });
    this.linea.setCoords();
  }
  actualizarPosTextoEnlace(nodoTexto, nodoEnlazado, textoItem) {
    let vector = calcularVectorUnitario(nodoTexto, nodoEnlazado, textoItem);
    if (vector == null) return;
    let radio = nodoTexto.getRadio();
    let margen = 17;
    let distancia = radio + margen;
    let left = nodoTexto.getX() + vector.x * distancia - textoItem.width / 2;
    let top = nodoTexto.getY() + vector.y * distancia - textoItem.height / 2;
    textoItem.set({ left, top });
  }
  eliminarGraficos(){
      CANVAS.remove(this.linea);
      CANVAS.remove(this.textoItem1);
      CANVAS.remove(this.textoItem2);
  }
  getNodo1(){
      return this.nodo1;
  }

  getNodo2(){
    return this.nodo2;
  }
  getTextoItem1(){
      return this.textoItem1;
  }
  setTexto1(text){
    this.textoItem1.set("text",text);
    CANVAS.renderAll();
  }
  setTexto2(text){
    this.textoItem2.set("text",text);
    CANVAS.renderAll();
  }
  getColor(){
    return this.linea.get("stroke");
  }
  setColor(c){
    this.linea.set("stroke",c);
    CANVAS.renderAll();
  }
  getTextoItem2(){
      return this.textoItem2;
  }
  getTexto1(){
    return this.textoItem1.get("text");
  }
  getTexto2(){
    return this.textoItem2.get("text");
  }

  getID(){
    return this.id;
  }
}
