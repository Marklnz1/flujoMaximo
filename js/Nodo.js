class Nodo {
    radio;
    textoItem;
    circulo;
    grupo;
    nombre;
    id;
    seleccionado;
    constructor(x, y, radio, nombre) {
      this.radio = radio;
      this.nombre = nombre;
      let {circulo,textItem,grupo,id} = crearCirculoConTexto(x, y, radio, nombre);
      this.circulo = circulo;
      this.textoItem = textItem;
      this.grupo = grupo;
      this.id = id;
      this.seleccionado = false;
      CANVAS.add(this.grupo);

    }
    setColor(color){
      this.circulo.set("fill",color);
      CANVAS.renderAll();

    }
    setNombre(nombre) {
      this.textoItem.set("text", nombre);
      centrarTextoDeCirculo(this.textoItem, this.circulo);
      CANVAS.renderAll();

    }
    getColor(){
      return this.circulo.get("fill");
    }
    setSeleccionado(b){
      this.seleccionado = b;
    }
    estaSeleccionado(){
      return this.seleccionado;
    }
    getRadio() {
      return this.radio;
    }
    getNombre() {
      return this.nombre;
    }
    getX() {
      return this.grupo.left;
    }
    getY() {
      return this.grupo.top;
    }
    eliminarGraficos(){
        CANVAS.remove(this.grupo);
    }
    getID(){
        return this.id;
    }
    bloquearMovimiento(b){
      this.grupo.lockMovementX = b;
      this.grupo.lockMovementY = b;
    }
    bloquearSeleccion(b){
      this.grupo.set("selectable",!b);
    }
  }