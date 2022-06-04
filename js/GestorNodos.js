class GestorNodos {
  enlaces;
  nodos;
  constructor() {
    this.enlaces = [];
    this.nodos = [];
  }
  actualizar() {
    for (let e of this.enlaces) {
      e.actualizar();
    }
  }
  crearNodo(x, y, nombre) {
    this.nodos.push(new Nodo(x, y, 30, nombre));
  }
  eliminarNodo(nombre) {
    for (let n of this.nodos) {
      if (n.getNombre() == nombre) {
        this.eliminarEnlace(nombre);
        n.eliminarGraficos();
        removerItemDeArray(n, nodos);
      }
    }
  }
  eliminarNodoID(id){
    for (let n of this.nodos) {
      if (n.getID() == id) {
        let enlacesEliminar = this.getEnlacesNodo(n);
        for(let e of enlacesEliminar){
          e.eliminarGraficos();
          removerItemDeArray(e,this.enlaces);
        }
        n.eliminarGraficos();
        removerItemDeArray(n, this.nodos);
      }
    }
  }
  eliminarEnlace(nodo1, nodo2) {
    if (nodo1 == null || nodo2 == null) {
      return;
    }

    let enlaceEliminar = this.getEnlace(nodo1, nodo2);
    if(enlaceEliminar==null) return;
    enlaceEliminar.eliminarGraficos();
    removerItemDeArray(enlaceEliminar, this.enlaces);
    
  }
  getEnlacesNodo(nodo) {
    if(nodo==null) return;
    let enlaces = [];
    if (nodo == null) return;
    for (let e of this.enlaces) {
      if (e.nodo1 == nodo || e.nodo2 == nodo) {
        enlaces.push(e);
      }
    }
    return enlaces;
  }
  getEnlace(nodo1, nodo2) {
    if (nodo1 == null || nodo2 == null) return;

    for (let e of this.enlaces) {
      if (
        (e.nodo1 == nodo1 && e.nodo2 == nodo2) ||
        (e.nodo1 == nodo2 && e.nodo2 == nodo1)
      ) {
        return e;
      }
    }
  }
  crearEnlace(nodo1, nodo2,peso1,peso2) {
    if(nodo1==null||nodo2==null) return;
    this.enlaces.push(new Enlace(nodo1, nodo2,peso1,peso2));
  }

  getNodo(nombre) {
    for (let n of this.nodos) {
      if (n.getNombre() == nombre) {
        return n;
      }
    }
  }
  getNodoID(id){
    for (let n of this.nodos) {
        if (n.getID() == id) {
          return n;
        }
      }
  }
  resetearNodos(){
    for(let n of this.nodos){
      n.setColor("#195972");
      n.setSeleccionado(false);
    }
    for(let e of this.enlaces){
      e.setColor("gray");
    }
    NODOS_SELECCIONADOS.length = 0;
    CANVAS.discardActiveObject().renderAll();

  }
  getEnlaceID(id){
    for(let e of this.enlaces){
      if(e.getID()==id){
        return e;
      }
    }
    return null;
  }
  bloquearMovimiento(b){
    for(let n of this.nodos){
      n.bloquearMovimiento(b);
    }
  }
  bloquearSeleccion(b){
    for(let n of this.nodos){
      n.bloquearSeleccion(b);
    }
  }
  generarEstados(){
    let estadosNodos = [];
    for(let n of this.nodos){
      estadosNodos.push({id:n.getID(),color:n.getColor()});
    }
    let estadosEnlaces = [];
    for(let e of this.enlaces){
      estadosEnlaces.push({id:e.getID(),color:e.getColor(),texto1:e.getTexto1(),texto2:e.getTexto2()});
    }
    return {estadosNodos,estadosEnlaces};
  }
  generarEstadosColorEnlaces(){
    let estados = [];
    for(let e of this.enlaces){
      estados.push({id:e.getID(),color:e.getColor()});
    }
    return estados;
  }

  generarEstadosColorNodos(){
    let estados = [];
    for(let n of this.nodos){
      estados.push({id:n.getID(),color:n.getColor()});
    }
    return estados;
  }
  generarEstadosDatosEnlaces(){
    let estados = [];
    for(let e of this.enlaces){
      estados.push({id:e.getID(),texto1:e.getTexto1(),texto2:e.getTexto2()});
    }
    return estados;
  }
  resetearColor(){
    for(let n of this.nodos){
      n.setColor("#195972");
    }
    for(let e of this.enlaces){
      e.setColor("gray");
    }
  }
}
